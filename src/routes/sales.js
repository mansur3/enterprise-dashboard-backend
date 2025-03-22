const express = require("express");
const router = express.Router();

const salesController = require("../controllers/sales.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/sales", authMiddleware, salesController.getAllData);

module.exports = router;
