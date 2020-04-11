const express = require('express');
const server = express();

server.get('/', (req, res) => {
    res.send(`My Mentor API`)
});

server.use(express.json());

module.exports = server;