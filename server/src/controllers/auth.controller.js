import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.js";
import { signToken } from "../utils/jwt.js";
import { sendOtpEmail } from "../services/email.service.js";
import crypto from "crypto";

export async function signup(req, res, next) {
  try {
    const exists = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (exists) return res.status(409).json({ message: "Email already registered" });

    const password = await bcrypt.hash(req.body.password, 12);
    const user = await prisma.user.create({
      data: { ...req.body, password },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });

    res.status(201).json({ user, token: signToken(user) });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await prisma.user.findUnique({ where: { email: req.body.email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const safeUser = { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt };
    res.json({ user: safeUser, token: signToken(user) });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true }
    });
    res.json({ user });
  } catch (error) {
    next(error);
  }
}

export function logout(_req, res) {
  res.json({ message: "Logged out" });
}

export async function forgotPassword(req, res, next) {
  try {
    const { identifier } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier.toLowerCase() },
          { id: identifier } // Assuming id might be used as officeId if they match
        ]
      }
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: { resetOtp: otp, resetOtpExpires: expires }
    });

    await sendOtpEmail(user.email, otp);

    res.json({ message: `OTP sent to ${user.email.replace(/(.{2})(.*)(@.*)/, "$1***$3")}`, email: user.email });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { identifier, otp, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier.toLowerCase() },
          { id: identifier }
        ]
      }
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.resetOtp || user.resetOtp !== otp || user.resetOtpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetOtp: null, resetOtpExpires: null }
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
}
