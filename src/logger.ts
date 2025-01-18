import pino from "pino";

const levels = {
  emerg: 80,
  alert: 70,
  crit: 60,
  error: 50,
  warn: 40,
  notice: 30,
  info: 20,
  debug: 10,
};

// create a transport
const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      options: {
        // destination: "./logs/output.log",
        // mkdir: true,
        colorize: false,
      },
    },
    {
      target: "pino-pretty",
      options: { destination: process.stdout.fd },
    },
  ],
});

// Configure Pino logger
const logger = pino(
  {
    level: process.env.PINO_LOG_LEVEL || "info",
    customLevels: levels,
    redact: { paths: ["email", "password", "address"], remove: true },
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport
);

export default logger;
