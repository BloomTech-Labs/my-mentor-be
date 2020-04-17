const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const server = express();

const userRouter = require('../router/users/users-router');
const mentorRouter = require("../router/mentors/mentor-router");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/mentor', mentorRouter)
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
    res.send(`My Mentor API`)
});


module.exports = server;