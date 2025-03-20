const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const profileRouter = require("./profile");
const salesRouter = require("./sales");

router.use("/v1", userRouter);
router.use("/auth", profileRouter);
router.use("/product", salesRouter);

module.exports = router;
