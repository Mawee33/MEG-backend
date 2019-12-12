const express = require("express");
const router = new express.Router();
const lingerieModel = require("./../models/Lingerie");
const uploader = require("./../config/cloudinary");

router.get("/lingeries", (req, res) => {
    lingerieModel
    .find()
    .then(dbRes => {
        console.log("here2")
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

router.post("/lingeries", uploader.single("image"), (req, res) => {
    console.log("here");
    const infos = { ...req.body };
  if (req.file) infos.image = req.file.secure_url;
  console.log(infos);
    lingerieModel
    .create(infos)
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