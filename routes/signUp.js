const express = require("express");
const router = express.Router();
const signUpModel = require("../models/signUp");
const bcrypt = require("bcrypt");

const salt_rounds = 10;

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, salt_rounds);

    const signUp = new signUpModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const data = await signUp.save();
    res.status(201).send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/", (req, res) => {
  signUpModel.find();
  const users = signUpModel
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send("There is a problem to find user", err);
    });
});

router.get("/:id", (req, res) => {
  const _id = req.params.id;
  signUpModel.findById(_id);
  const user = signUpModel
    .findById((_id = req.params.id))
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.patch("/:id", (req, res) => {
  const _id = req.params.id;
  const { name, password } = req.body;
  const update = { name, password };

  const updateUser = signUpModel
    .findByIdAndUpdate(_id, update, { new: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.delete("/:id", (req, res) => {
  const deleteUser = signUpModel
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", async (req, res) => {
  try {
    const user = await signUpModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).send({ error: "Invalid password" });
    }

    res.send({ message: "Login successful" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
module.exports = router;
