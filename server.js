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

// ADD SESSION SETTINGS HERE:
server.use(
  session({
    cookie: { secure: false, maxAge: 4 * 60 * 60 * 1000 }, // 4 hours
    resave: true,
    saveUninitialized: true,
    secret: "some secret goes here"
  })
);

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  /* credentials : Configures the Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted  https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials */
  credentials: true,
  optionsSuccessStatus: 200
};

server.use(cors(corsOptions));

// USE passport.initialize() and passport.session() HERE:
server.use(passport.initialize());
server.use(passport.session());

//------------------------------------------
// BASE BACKEND ROUTE
// ------------------------------------------
server.get("/", (req, res) => {
  res.send("backend server is running");
});

// ROUTING

const usersRouter = require("./routes/users.js");
const vetementsRouter = require("./routes/vetements.js");
const lingeriesRouter = require("./routes/lingeries.js");
const shoppingCartRouter = require("./routes/shoppingCart.js");
const authRouter = require("./routes/auth.js");
const searchRouter = require("./routes/search");
const contactRouter = require("./routes/contact");

server.use(usersRouter);
server.use(vetementsRouter);
server.use(lingeriesRouter);
server.use(shoppingCartRouter);
server.use(authRouter);
server.use(searchRouter);
server.use(contactRouter);

// KICKSTART
server.listen(process.env.PORT, () => {
  console.log(`
      yay ! app is ready:
      -------->
      backend server runs @ : http://localhost:${process.env.PORT}
      -------->
      client server runs @ : ${process.env.FRONTEND_URL}
    `);
});
