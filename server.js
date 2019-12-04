require ("dotenv").config();
require("./config/mongo");

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

server.use(usersRouter);
server.use(vetementsRouter);

server.listen(process.env.PORT, () => {
    console.log("MEG started @ http://localhost:" + process.env.PORT)
});