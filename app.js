const express = require("express");
const mongoose = require("mongoose");
const app = express();
const env = require("dotenv").config();

app.use(express.json());

const signUpRoutes = require("./routes/signUp");

app.get("/", (req, res) => {
  res.send("This is the home page");
});

app.use("/signUp/", signUpRoutes);


app.listen(5001, () => {
  console.log("Server running on port 5001");
});

mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("There is a problem to connect database", err));
