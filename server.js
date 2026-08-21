import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import exp from "express";
import { connectDB } from "./lib/mongodb.connect.js";
import passport from "./lib/passport.js";
import { requireAuthPage } from "./middlewares/auth.middleware.js";
import authRoutes from "./routers/auth.route.js";
import budgetRoutes from "./routers/budget.route.js";
import dashboardRoutes from "./routers/dashboard.route.js";
import userRoutes from "./routers/user.route.js";

dotenv.config();

const app = exp();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Database connection failed" });
  }
});

app.use("/public", exp.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/dashboard", requireAuthPage, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

app.get("/budgets", requireAuthPage, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "budgets.html"));
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/budgets", budgetRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1", userRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 7000;

if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    });
}

export default app;
