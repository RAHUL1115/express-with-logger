const morgan = require("morgan");
const Logger = require("./logger");
const logger = new Logger("morgan");

const stream = {
  write: (message) => logger.http(message.trim()),
};

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

const morganMiddleware = morgan("tiny", { stream, skip });

module.exports = morganMiddleware;