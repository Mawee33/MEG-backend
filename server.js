require("dotenv").config();
require("./config/mongo");
require("./config/dbConfig");
require("./config/passport");

const express = require("express");
const server = express();
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");

server.use(express.json());

server.use(cors("*"));

server.get("/", (req, res) => {
  res.send("ok");
});

// ROUTING

const usersRouter = require("./routes/users");
const vetementsRouter = require("./routes/vetements");
const lingeriesRouter = require("./routes/lingeries");
const shoppingCartRouter = require("./routes/shoppingCart");
const authRouter = require("./routes/auth");

server.use(usersRouter);
server.use(vetementsRouter);
server.use(lingeriesRouter);
server.use(shoppingCartRouter);
server.use(`/api`, authRouter);

// ADD SESSION SETTINGS HERE:
server.use(session({
    secret:"some secret goes here",
    resave: true,
    saveUninitialized: true
  }));

  // USE passport.initialize() and passport.session() HERE:
server.use(passport.initialize());
server.use(passport.session());
  

server.listen(process.env.PORT, () => {
  console.log("MEG started @ http://localhost:" + process.env.PORT);
});
