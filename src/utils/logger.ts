import winston, { LoggerOptions } from "winston";

const logConfig: LoggerOptions = {
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.label({
      label:  `Label🏷️`
    }),
    winston.format.timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    winston.format.printf(info => `[${info.level.toLocaleUpperCase()}] [${info.timestamp}]: ${info.message}`)
  )
}

export const logger = winston.createLogger(logConfig) 