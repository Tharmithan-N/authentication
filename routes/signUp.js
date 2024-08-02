const express = require("express");
const router = express.Router();
const signUpModel = require("../models/signUp");

router.post("/", (req, res) => {
  const signUp = new signUpModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  signUp
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
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
        res.send(data)
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
