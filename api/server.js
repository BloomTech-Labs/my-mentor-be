const express = require('express');
const helmet = require('helmet');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const authRouter = require("../auth/auth-router");
const server = express();

const userRouter = require('../router/users/users-router');
const mentorRouter = require("../router/mentors/mentor-router");
const menteeRouter = require("../router/mentees/mentees-router");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/mentee', menteeRouter);
server.use('/api/mentor', mentorRouter);
server.use('/api/users', userRouter);
server.use('/api/auth', authRouter);

server.get('/', (req, res) => {
    res.send(`My Mentor API`)
});


server.get('/token', (req, res) => {
  
  const payload = {
    subject: 'thisuser',
    userid: 'user.id',
  };

  const secret = 'wombat';
  const options = {
    expiresIn: '1h'
  };

  const token = jwt.sign(payload, secret, options);

  res.json(token);
});


module.exports = server;