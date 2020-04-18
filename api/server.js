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