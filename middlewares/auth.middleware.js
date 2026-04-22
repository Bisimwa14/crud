import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user.model.js";

export const requireAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Authentication error" });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export const requireAuthPage = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.redirect("/login");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-jwt-secret");
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch {
    return res.redirect("/login");
  }
};
