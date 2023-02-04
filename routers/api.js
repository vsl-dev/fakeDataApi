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
  generateMassiveData,
  randomAccount,
  randomBankAccount,
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
  try {
    const locale = req.body.locale;
    var Data = randomHuman(locale);
    res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Internal server error" });
    console.log(err);
  }
});

router.post("/account", (req, res) => {
  try {
    const locale = req.body.locale;
    var Data = randomAccount(locale);
    res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Internal server error" });
    console.log(err);
  }
});

router.post("/bankAccount", (req, res) => {
  try {
    var Data = randomBankAccount();
    res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Internal server error" });
    console.log(err);
  }
});

router.post("/phoneNumber", (req, res) => {
  try {
    const custom = req.body.custom;
    const locale = req.body.locale;
    var Data = randomPhoneNum(locale, custom);
    res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Internal server error" });
    console.log(err);
  }
});

router.post("/email", (req, res) => {
  try {
    const locale = req.body.locale;
    const custom = req.body.customDomain;
    var Data = randomEmail(locale, custom);
    res.status(200).json({ code: 200, message: "Ok", data: Data ?? {} });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Internal server error" });
    console.log(err);
  }
});

router.post("/massiveData", (req, res) => {
  try {
    const type = req.body.type;
    const locale = req.body.locale;
    const count = req.body.itemCount;
    var Data = generateMassiveData(type, count, locale);
    res.status(200).json({ code: 200, message: "Ok", data: Data ?? [] });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Internal server error" });
    console.log(err);
  }
});

// 404 page

router.get("/*", (req, res) => {
  res.status(404).json({ code: 404, message: "Not found" });
});

export default router;
