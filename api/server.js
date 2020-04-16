const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mentorRouter = require("../router/mentors/mentor-router");
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/mentor', mentorRouter)
server.get('/', (req, res) => {
    res.send(`My Mentor API`)
});


module.exports = server;