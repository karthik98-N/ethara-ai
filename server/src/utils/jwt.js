import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "replace-me-in-production";

export function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: "7d" });
}

export function verifyToken(token) {
  return jwt.verify(token, secret);
}
