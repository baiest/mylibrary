import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";

export const logMiddleware = (req: Request, _: Response, next: NextFunction) => {
  logger.info(`${req.ip}: ${req.method} - ${req.url}`)
  next()
}