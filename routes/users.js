const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const shoppingCartModel = require("./../models/User");

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ users: users });
  } catch (err) {
    res.status(500).json(Err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req, params, id);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  userModel
    .create(req.body)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
