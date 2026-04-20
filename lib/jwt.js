import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "dev-jwt-secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
}
