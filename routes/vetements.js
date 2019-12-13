const express = require("express");
const router = new express.Router();
const vetementModel = require("./../models/Vetement");
const uploader = require("./../config/cloudinary");

router.get("/vetements", (req, res) => {
  vetementModel
    .find()
    .then(dbRes => {
        console.log("here3")
      res.status(200).send(dbRes);
    })
    .catch(dbErr => {
      res.status(500).send(dbErr);
    });
});

router.get("/vetements/:id", (req, res) => {
  vetementModel
    .findById(req.params.id)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(dbErr => {
      res.status(500).send(dbErr);
    });
});

router.post("/vetements", uploader.single("image"), (req, res) => {
  console.log(req.body);
  const infos = { ...req.body };
  infos.size = JSON.parse(infos.size);
  infos.size.forEach((s) => console.log(typeof s));
  // )
  console.log("infos.size");
  console.log(infos.size);
  // return res.send("ok")
  if (req.file) infos.image = req.file.secure_url;
  console.log(infos);
  vetementModel
    .create(infos)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(dbErr => {
      console.log(dbErr)
      res.status(500).send(dbErr);
    });
});

router.patch("/:id", (req, res) => {
  vetementModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
      res.status(200).send(dbRes);
    })
    .catch(dbErr => {
      res.status(500).send(dbErr);
    });
});

module.exports = router;
