const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
var cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "uploads")));

app.get("/health-check", async (req, res) => {
  return res.status(200).send({
    message: "I am good",
  });
});

const routes = require("./routes/index");

app.use("/api", routes);

module.exports = { app };
