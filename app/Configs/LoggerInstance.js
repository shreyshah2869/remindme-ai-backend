import pino from "pino";

const appLogger = pino({
  level: process.env.LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level: (label) => ({ level: label }),
  },
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "req.body.password",
  ],
});

export default appLogger;
