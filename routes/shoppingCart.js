const express = require("express");
const router = new express.Router();
const shoppingCartModel = require("./../models/ShoppingCart");

router.get("/shoppingCart", (req, res) => {
    shoppingCartModel
    .find()
    .populate("product")
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

router.delete("/shoppingCart/:id", (req, res) => {
    // console.log(req.params.id)
    // res.send("at todo delete item from cart")
    shoppingCartModel
    .findByIdAndDelete(req, params, id)
    .then(dbRes => {
        res.status(200).send(dbRes)
    })
    .catch(err);
    res.status(500).send(err);
})

module.exports = router;

