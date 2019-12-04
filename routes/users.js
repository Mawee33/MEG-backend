const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");

router.get("/users", (req, res) => {
    userModel
    .find()
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    });
});

router.get("/users/:id", (req, res) => {
    userModel
    .findById(req, params, id)
    .then(dbRes => {
        res.status(200).send(dbRes)
    })
    .catch(err);
    res.status(500).send(err);
})

router.post("/", (req, res) => {
    userModel
    .create(req.body)
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(err => {
        res.status(500).send(err);
    })
})

module.exports = router;