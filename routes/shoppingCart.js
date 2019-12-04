const express = require("express");
const router = new express.Router();
const shoppingCartModel = require("./../models/ShoppingCart");

router.get("/shoppingCart", (req, res) => {
    shoppingCartModel
    .find()
    .populate("vetement")
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    });
});

router.get("/shoppingCart/:id", (req, res) => {
    shoppingCartModel
    .findById(req, params, id)
    .then(dbRes => {
        res.status(200).send(dbRes)
    })
    .catch(err);
    res.status(500).send(err);
})

router.post("/", (req, res) => {
    shoppingCartModel
    .create(req.body)
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(err => {
        res.status(500).send(err);
    })
})

module.exports = router;

