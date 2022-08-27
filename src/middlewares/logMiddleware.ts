import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";

export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const info = `${req.ip}: ${req.method} - ${req.url}`
  // logger.info(`${req.ip}: ${req.method} - ${req.url}`)
  res.on("error", (err) => logger.error(err))
  res.on("finish", () => logger.info(`${info} - ${res.statusCode}`))
  next()
}