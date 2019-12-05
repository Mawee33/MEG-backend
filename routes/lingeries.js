const express = require("express");
const router = new express.Router();
const lingerieModel = require("./../models/Lingerie");

router.get("/lingeries", (req, res) => {
    lingerieModel
    .find()
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    })
})

router.get("/lingeries/:id", (req, res) => {
    lingerieModel
    .findById(req.params.id)
    .then(dbRes => {
        res.status(200).send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    })
})

router.post("/lingeries", (req, res) => {
    lingerieModel
    .create(req.body)
    .then(dbRes => {
        res.status(200).send(dbRes)
    })
    .catch(dbErr => {
        res.status(500).send(dbErr)
    });
});

router.patch("/:id", (req, res) => {
    lingerieModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
        res.status(200). send(dbRes);
    })
    .catch(dbErr => {
        res.status(500).send(dbErr);
    })
})

module.exports = router;