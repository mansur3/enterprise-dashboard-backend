const jsonWebToken = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send({ message: "Access Denied" });
  }
  if (!token?.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Invalid Token" });
  }

  try {
    const tokendata = token?.split(" ")[1];
    const verified = jsonWebToken.verify(tokendata, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).send({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
