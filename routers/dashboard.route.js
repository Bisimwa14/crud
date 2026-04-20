import exp from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = exp.Router();

router.get("/", requireAuth, getDashboard);

export default router;
