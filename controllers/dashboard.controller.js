import Budget from "../models/budget.model.js";

export async function getDashboard(req, res) {
  try {
    const entries = await Budget.find({ user: req.user._id }).lean();

    const income = entries
      .filter((entry) => entry.type === "income")
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

    const expense = entries
      .filter((entry) => entry.type === "expense")
      .reduce((sum, entry) => sum + Number(entry.amount || 0), 0);

    const balance = income - expense;

    const byCategory = entries.reduce((acc, entry) => {
      const key = `${entry.type}:${entry.category}`;
      if (!acc[key]) {
        acc[key] = {
          type: entry.type,
          category: entry.category,
          total: 0,
        };
      }

      acc[key].total += Number(entry.amount || 0);
      return acc;
    }, {});

    const latestEntries = [...entries]
      .sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate))
      .slice(0, 5);

    const MONTHS_BACK = 6;
    const now = new Date();
    const monthlyTrend = [];
    for (let i = MONTHS_BACK - 1; i >= 0; i--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      monthlyTrend.push({
        month: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`,
        label: monthDate.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
        income: 0,
        expense: 0,
      });
    }
    const trendIndexByMonth = new Map(monthlyTrend.map((m, idx) => [m.month, idx]));

    for (const entry of entries) {
      const entryDate = new Date(entry.entryDate);
      const key = `${entryDate.getFullYear()}-${String(entryDate.getMonth() + 1).padStart(2, "0")}`;
      const idx = trendIndexByMonth.get(key);
      if (idx === undefined) continue;

      if (entry.type === "income") {
        monthlyTrend[idx].income += Number(entry.amount || 0);
      } else if (entry.type === "expense") {
        monthlyTrend[idx].expense += Number(entry.amount || 0);
      }
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
        },
        metrics: {
          totalIncome: income,
          totalExpense: expense,
          netBalance: balance,
        },
        breakdownByCategory: Object.values(byCategory),
        latestEntries,
        monthlyTrend,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
