const express = require('express');
const cors = require('cors');

const server = express();
const projectRouter = require('./projectRouter');

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send('Projects and actions!');
})

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request from ${req.url}}`
  );
  next();
};

function errorHandler(error, req, res, next) {
  res.status(500).json({ message: "There was an error" })
}

server.use(errorHandler);

module.exports = server;