import Budget from "../models/budget.model.js";

export async function createBudgetEntry(req, res) {
  try {
    const { title, type, category, amount, note, entryDate } = req.body;

    if (!title || !type || !category || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "title, type, category, and amount are required",
      });
    }

    const budgetEntry = await Budget.create({
      user: req.user._id,
      title,
      type,
      category,
      amount,
      note,
      entryDate,
    });

    res.status(201).json({ success: true, data: budgetEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getBudgetEntries(req, res) {
  try {
    const entries = await Budget.find({ user: req.user._id }).sort({ entryDate: -1 });

    res.status(200).json({
      success: true,
      count: entries.length,
      data: entries,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getBudgetEntryById(req, res) {
  try {
    const entry = await Budget.findOne({ _id: req.params.id, user: req.user._id });

    if (!entry) {
      return res.status(404).json({ success: false, message: "Budget entry not found" });
    }

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateBudgetEntry(req, res) {
  try {
    const entry = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!entry) {
      return res.status(404).json({ success: false, message: "Budget entry not found" });
    }

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function deleteBudgetEntry(req, res) {
  try {
    const entry = await Budget.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!entry) {
      return res.status(404).json({ success: false, message: "Budget entry not found" });
    }

    res.status(200).json({ success: true, message: "Budget entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
