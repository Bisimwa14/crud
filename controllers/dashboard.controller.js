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
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
