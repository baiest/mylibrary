import * as BookController from "../controllers/book.controller";
import { Router } from "express";

export const booksRouter = Router()

booksRouter.get('/', BookController.getAll)
booksRouter.post('/', BookController.create)