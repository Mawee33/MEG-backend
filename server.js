require ("dotenv").config();
require("./config/mongo");
require("./config/dbConfig");

const express = require("express");
const server = express();
const cors = require("cors");

server.use(express.json());

server.use(cors("*"));

server.get("/", (req, res) => {
    res.send("ok");
});

// ROUTING

const usersRouter = require("./routes/users");
const vetementsRouter = require("./routes/vetements");
const shoppingCartRouter = require("./routes/shoppingCart");

server.use(usersRouter);
server.use(vetementsRouter);
server.use(shoppingCartRouter);

server.listen(process.env.PORT, () => {
    console.log("MEG started @ http://localhost:" + process.env.PORT)
});