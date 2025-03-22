const express = require("express");
const router = express.Router();

const userController = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/profile", userController.getAllUsers);
router.post("/login", userController.getUserByUserAndPassword);
router.post("/profile", userController.createUser);
router.put("/profile/:id", userController.updateUserById);
router.delete("/profile/:id", userController.deleteUserById);

router.get(
  "/profile/user-activity",
  authMiddleware,
  userController.getUserActivity
);

module.exports = router;
