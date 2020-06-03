import { createLogger, format, transports, debug } from "winston";

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "instaleap" },
  transports: [
    new transports.File({
      filename: `${__dirname}/logs/error.log`,
      level: "error",
    }),
    new transports.File({ filename: `${__dirname}/logs/combined.log` }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}
