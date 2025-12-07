const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the Vite Backend Server</h1>");
});

app.get("/data", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "Here we are!!!!!",
  });
});

app.listen(4000, () => {
  console.log("Server stated successfully on port 4000");
});
