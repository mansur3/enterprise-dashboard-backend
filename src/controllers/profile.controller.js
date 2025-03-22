const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const generateToken = (user) => {
  return jwt.sign(user, TOKEN_SECRET);
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.profile.findMany();
    return res.status(200).send({
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getUserByUserAndPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    await prisma.user_activity.create({
      data: {
        // userId: +user.id,
        username: user.name,
        activity: "Login",
        // Profile: user.id,
      },
    });

    return res.status(200).send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userData = await prisma.profile.findUnique({
      where: {
        email: email,
      },
    });

    if (userData) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.profile.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = generateToken({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    await prisma.user_activity.create({
      data: {
        // userId: user.id,
        username: user.name,
        activity: "Sign up",
        // Profile: user.id,
      },
    });
    return res.status(201).send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await prisma.profile.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(200).send({
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.profile.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getUserActivity = async (req, res) => {
  try {
    const userActivity = await prisma.user_activity.findMany();
    return res.status(200).send({
      data: userActivity,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
