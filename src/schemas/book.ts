import { BookCreate, BookRequest } from './../models/book';
import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { validateRequest } from "../middlewares/validateRequest"


export const BookCreateSchema = (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res, next, Joi.object<BookRequest>({
    name: Joi.string().required(),
    description: Joi.string().required(),
    publication_year: Joi.number().required(),
    author: Joi.string().required(), 
    gender: Joi.string().required(),
  }))
}
export const BookUpdateSchema = (req: Request, res: Response, next: NextFunction) => {
  validateRequest(req, res, next, Joi.object<Partial<BookRequest>>({
    name: Joi.string(),
    description: Joi.string(),
    publication_year: Joi.number(),
    author: Joi.string(), 
    gender: Joi.string(),
  }))
}