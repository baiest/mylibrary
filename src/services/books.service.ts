import { BookCreateSchema, BookUpdateSchema } from './../schemas/book';
import * as BookController from "../controllers/book.controller";
import { Router } from "express";

export const booksRouter = Router()

booksRouter.get('/', BookController.getAll)
booksRouter.get('/:id', BookController.getById)
booksRouter.post('/', BookCreateSchema ,BookController.create)
booksRouter.put('/:id', BookUpdateSchema, BookController.update)
booksRouter.delete('/:id', BookController._delete)