/*------------------------------------------
// AUTH ROUTING
------------------------------------------*/
const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");
const minPasswordLength = 4;

// Registering SIGNUP

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

/*
  learn more about session, cookies, token here =>
  https://www.youtube.com/watch?v=2PPSXonhIck&t=1809s
*/
// more on HTTP status
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
router.post("/signup", (req, res, next) => {
  // console.log("file ?", req.file);
  // console.log(req.body);
  var errorMsg = "";
  const { userName, password, email } = req.body;
  // @todo : best if email validation here or check with a regex in the User model
  if (!password || !email) errorMsg += "Provide email and password.\n";
  if (password.length < minPasswordLength)
    errorMsg += `Please make your password at least ${minPasswordLength} characters.`;
  if (errorMsg) return res.status(403).json(errorMsg); // 403   Forbidden
  const salt = bcrypt.genSaltSync(10);
  // more on encryption : https://en.wikipedia.org/wiki/Salt_(cryptography)
  const hashPass = bcrypt.hashSync(password, salt);
  const newUser = {
    userName,
    email,
    password: hashPass
  };
  // check if an avatar FILE has been posted
  userModel
    .create(newUser)
    .then(newUserFromDB => {
      // passport in action below
      req.login(newUserFromDB, err => {
        if (err)
          // bad status
          res
            .status(500)
            .json("Something went wrong with automatic login after signup");
        // all good
        res.status(200).json(req.user);
      });
    })
    .catch(apiErr => {
      res.status(409).json(apiErr); // 409  Conflict
    });
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    console.log("ici signin ---->");
    console.log("err", err);
    console.log("user ?", user);

    if (err || !user) return res.status(403).json("invalid user infos"); // 403 : Forbidden
    /**
     * req.Login is a passport method
     * check the doc here : http://www.passportjs.org/docs/login/
     */
    req.logIn(user, function(err) {
      /* doc says: When the login operation completes, user will be assigned to req.user. */
      if (err) {
        return res.json({ message: "Something went wrong logging in" });
      }
      // We are now logged in
      // You may find usefull to send some other infos
      // dont send sensitive informations back to the client
      // let's choose the exposed user below
      const { _id, userName, email, favorites, role } = user;
      // and only expose non-sensitive inofrmations to the client's state
      next(
        res.status(200).json({
          currentUser: {
            _id,
            userName,
            address,
            email,
            password,
            role,
            favorites
          }
        })
      );
    });
  })(req, res, next); // IIFE (module) pattern here (see passport documentation)
});

router.post("/signout", (req, res, next) => {
  req.logout(); // utility function provided by passport
  res.json({ message: "Success" });
});

router.use("/is-loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    // method provided by passport
    const {
      _id,
      userName,
      address,
      favorites,
      email,
      password,
      role
    } = req.user;

    return res.status(200).json({
      currentUser: {
        _id,
        userName,
        address,
        email,
        favorites,
        password,
        role
      }
    });
  }
  res.status(403).json("Unauthorized");
});
module.exports = router;
