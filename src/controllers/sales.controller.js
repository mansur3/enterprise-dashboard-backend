const prisma = require("../config/db");

exports.getAllData = async (req, res) => {
  try {
    const sales = await prisma.car_overview.findMany();
    return res.status(200).send({
      data: sales,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
