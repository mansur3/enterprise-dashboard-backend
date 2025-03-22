const prisma = require("../config/db");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).send({
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
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

exports.createUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const userDataCheck = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userDataCheck) {
      return res.status(400).send({ message: "User already exists" });
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    const userData = await prisma.user.findUnique({
      where: { id: user.id }, // Make sure this userId exists
    });

    if (!userData) {
      console.log("User does not exist!");
    }

    const profile = await prisma.profile.findUnique({
      where: { id: req.user.id }, // Make sure this profileId exists
    });

    if (!profile) {
      console.log("Profile does not exist!");
    }
    await prisma.user_activity.create({
      data: {
        // userId: user?.id ?? null,
        // profileId: req?.user?.id ?? null,
        username: user.name,
        activity: "Created new user.",
      },
    });
    return res.status(201).send({
      data: user,
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
    const user = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        password,
      },
    });
    await prisma.user_activity.create({
      data: {
        // userId: req.user.id,
        // profileId: user.id,
        username: req.user.name,
        activity: "Updated user.",
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
    const user = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    await prisma.user_activity.create({
      data: {
        // userId: req.user.id,
        // profileId: user.id,
        username: req.user?.name ?? "deleted user",
        activity: "Deleted user",
      },
    });
    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
