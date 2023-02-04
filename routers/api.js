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

import {
  randomAccount,
  randomEmail,
  randomHuman,
  randomPhoneNum,
} from "../lib/fakeGen.js";

router.use(apiLimiter);

router.get("/", (req, res) => {
  res.status(200).json({ code: 200, message: "Ok" });
});

// Api

router.post("/human", (req, res) => {
  const type = req.body.type;
  const locale = req.body.locale;
  var Data;
  switch (type) {
    case "account":
      Data = randomAccount(locale);
      break;
    case "human":
      Data = randomHuman(locale);
      break;
    default:
      res.status(400).json({ code: 400, message: "Invalid type" });
  }
  res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
});

router.post("/phoneNumber", (req, res) => {
  const custom = req.body.custom;
  const locale = req.body.locale;
  var Data = randomPhoneNum(locale, custom);
  res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
});

router.post("/email", (req, res) => {
  const locale = req.body.locale;
  const custom = req.body.customDomain
  var Data = randomEmail(locale, custom);
  res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
});

// 404 page

router.get("/*", (req, res) => {
  res.status(404).json({ code: 404, message: "Not found" });
});

export default router;
