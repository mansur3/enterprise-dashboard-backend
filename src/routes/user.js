const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/users", authMiddleware, userController.getAllUsers);
router.get("/users/:id", authMiddleware, userController.getUserById);
router.post("/users", authMiddleware, userController.createUser);
router.put("/users/:id", authMiddleware, userController.updateUserById);
router.delete("/users/:id", authMiddleware, userController.deleteUserById);

module.exports = router;
