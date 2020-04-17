const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const authRouter = require("../");
const server = express();

const userRouter = require('../users/users-router');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`My Mentor API`)
});

server.use(express.json());

module.exports = server;