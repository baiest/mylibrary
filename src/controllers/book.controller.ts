import { HttpStatusCode } from './../types/HttpStatusCode';
import { BookRepository } from './../repository/book';
import { Request, Response } from 'express';
import { BookRequest, bookToResponse } from '../models/book';

const bookRepository = new BookRepository()

export const getAll = async (_: Request, res: Response) => {
  try {
    const books = await bookRepository.getAll()
    res.json(books.map(bookToResponse))
  } catch (error: any) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.stack })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const data: BookRequest = req.body
    const book = await bookRepository.create({
      ...data,
      publicationYear: data.publication_year
    })
    res
      .status(HttpStatusCode.CREATED)
      .json(bookToResponse(book))
  } catch (error: any) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: error.stack })
  }
}