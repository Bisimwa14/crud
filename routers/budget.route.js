import exp from "express";
import {
  createBudgetEntry,
  deleteBudgetEntry,
  getBudgetEntries,
  getBudgetEntryById,
  updateBudgetEntry,
} from "../controllers/budget.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = exp.Router();

router.use(requireAuth);

router.route("/").get(getBudgetEntries).post(createBudgetEntry);

router.route("/:id").get(getBudgetEntryById).put(updateBudgetEntry).delete(deleteBudgetEntry);

export default router;
