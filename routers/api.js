import express from "express";
import { rateLimit } from "express-rate-limit";
const router = express.Router();

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    code: 429,
    message:
      "Too many requests, you have been rate limited. Please try again later.",
  },
});

import { randomUser } from "../lib/userGen.js";

router.get("/", (req, res) => {
  res.status(200).json({ code: 200, message: "Ok" });
});

// Api

router.get("/user", (req, res) => {
  res.status(200).json({ code: 200, message: "Ok", data: randomUser() ?? {} });
});

// 404 page

router.get("/*", (req, res) => {
  res.status(404).json({ code: 404, message: "Not found" });
});

export default router;
