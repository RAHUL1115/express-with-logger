// load the configs
require('dotenv').config();
const CONFIG = require('./config/config')
process.env.config = CONFIG;

const express = require("express");
const Logger = require("./logger/logger"); // import main Logger class
const morgan = require("./logger/morgon");
const logger = new Logger('main.js'); // create a logger instance for current file


const app = express();
const port = process.env.PORT || 3000;

app.use(morgan);

app.get("/", (req, res) => { //home route
  res.status(200).json({"message":"hello world!"});
});

app.post("/", (req, res) => {
  res.status(200).json({ message: "hello world!" });
});

app.listen(port, (err) => {
  logger.info("app is listening on port " + port);
});