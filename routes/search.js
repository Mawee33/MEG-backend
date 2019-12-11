const express = require("express");
const router = new express.Router();
const lingerieModel = require("../models/Lingerie");
const vetementModel = require("../models/Vetement");

router.get("/search", async (req, res) => {
  console.log(req.query);
  const regExp = new RegExp(req.query.q, "i");

  const vetementSearch = vetementModel.find({
    name: regExp
  });

  const lingerieSearch = lingerieModel.find({
    name: regExp
  });
console.log("ici")
  try {
    const dbRes = await Promise.all([vetementSearch, lingerieSearch]);

    res.json({ vetements: dbRes[0], lingeries: dbRes[1] });
  } catch (dbErr) {
    console.log(dbErr);
    res.status(500).end();
  }
});

module.exports = router;
