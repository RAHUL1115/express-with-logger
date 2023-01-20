const winston = require("winston");

class Logger {
  constructor(name) {
    this.filename = name;
    this.winston = winston;

    const level = process.env?.NODE_ENV === "development" ? "debug" : "warn";

    const transports = () => {
      let transports = [];

      this.fileFormat = winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => {
          let logMessage;
          logMessage = `${info.timestamp} : ${info.level} : ${
            this.filename
          } : ${info.message.trim()}`;
          if (typeof info.obj != "undefined") {
            logMessage += ` : ${JSON.stringify(info.obj)}`;
          }
          return logMessage;
        })
      );

      this.consoleFormat = winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf((info) => {
          let logMessage;
          logMessage = `${info.timestamp} : ${info.level} : ${
            this.filename
          } : ${info.message.trim()}`;
          if (typeof info.obj != "undefined") {
            logMessage += ` : ${JSON.stringify(info.obj)}`;
          }
          return logMessage;
        })
      );

      transports.push(
        new winston.transports.File({
          filename: `${Date.now()}.log`,
          dirname: `logs`,
          format: this.fileFormat,
        })
      );

      if (process.env.NODE_ENV === "development") {
        transports.push(
          new winston.transports.Console({
            format: this.consoleFormat,
          })
        );
      }

      return transports;
    };

    this.winston = winston.createLogger({
      level,
      transports: transports(),
    });
  }

  error(message, obj) {
    if (typeof obj) {
      this.winston.log("error", { message, obj });
    } else {
      this.winston.log("error", message);
    }
  }

  warn(message, obj) {
    if (typeof obj) {
      this.winston.log("warn", { message, obj });
    } else {
      this.winston.log("warn", message);
    }
  }

  info(message, obj) {
    if (typeof obj) {
      this.winston.log("info", { message, obj });
    } else {
      this.winston.log("info", message);
    }
  }
}

module.exports = Logger;
