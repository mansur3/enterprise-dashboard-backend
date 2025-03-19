const { app } = require("./src/app");

app.listen(2233, async (req, res) => {
  console.log("Server is running on port 2233");
});
