const prisma = require("../config/db");

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
        password: password,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
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
    const user = await prisma.profile.create({
      data: {
        name,
        email,
        password,
      },
    });
    return res.status(201).send({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
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
