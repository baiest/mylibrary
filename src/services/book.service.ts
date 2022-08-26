import * as BookController from "../controllers/book.controller";

import { Router } from "express";
export const router = Router()

router.get('/', BookController.getAll)
router.post('/', BookController.create)