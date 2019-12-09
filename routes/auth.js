/*------------------------------------------
// AUTH ROUTING
------------------------------------------*/

const express = require("express");
const router = new express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");

const minPasswordLength = 4;

/*
  learn more about session, cookies, token here =>
  https://www.youtube.com/watch?v=2PPSXonhIck&t=1809s
*/

// more on HTTP status
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

// routes/auth-routes.js
const auth = express.Router();
// require the user model !!!!
const User       = require('../models/User');


auth.post('/login', (req, res, next) => {
    const userName = req.body.userName;
    const password = req.body.password;
  
    if (!userName || !password) {
      res.status(400).json({ message: 'Provide username and password' });
      return;
    }
    if(password.length < 7){
        res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
        return;
    }
    User.findOne({ userName }, (err, foundUser) => {
        if(err){
            res.status(500).json({message: "Username check went bad."});
            return;
        }
        if (foundUser) {
            res.status(400).json({ message: 'Username taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
  
        const aNewUser = new User({
            userName:userName,
            password: hashPass
        });
  
        aNewUser.save(err => {
            if (err) {
                res.status(400).json({ message: 'Saving user to database went wrong.' });
                return;
            }
            
            // Automatically log in user after sign up
            // .login() here is actually predefined passport method
            req.login(aNewUser, (err) => {
                if (err) {
                    res.status(500).json({ message: 'Login after signup went bad.' });
                    return;
                }
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});


router.post("/signout", (req, res, next) => {
  req.logout(); // utility function provided by passport
  res.json({ message: "Success" });
});

router.use("/is-loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    // method provided by passport
    const { _id, username, favorites, email, role } = req.user;
    return res.status(200).json({
      currentUser: {
        _id,
        username,
        email,
        favorites,
        role
      }
    });
  }
  res.status(403).json("Unauthorized");
});

module.exports = auth;
