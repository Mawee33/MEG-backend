const express = require("express");
const router = new express.Router();
const vetementModel = require("./../models/Vetement");
const lingeroeModel = require("./../models/Lingerie");

router.get("/vetements", (req, res) => {
    vetementModel
    .find()
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    })
})

router.get("/vetements/:id", (req, res) => {
    vetementModel
    .findById(req.params.id)
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    })
})

router.post("/vetements", (req, res) => {
    vetementsModel
    .create(req.body)
    .then(dbRes => {
        res.status(200).send(dbRes)
    })
    .catch(dbErr => {
        res.status(500).send(dbErr)
    });
});

router.patch("/:id", (req, res) => {
    vetementModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
        res.status(200). send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    })
})

module.exports = router;