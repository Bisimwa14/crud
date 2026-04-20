import exp from "express";
import { getProfile, login, register } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const router = exp.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", requireAuth, getProfile);

export default router;
