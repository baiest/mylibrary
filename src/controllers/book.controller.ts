import { IBookRepository } from './../models/book';
import { HttpStatusCode } from './../types/HttpStatusCode';
import { BookRepository } from './../repository/book';
import { Request, Response } from 'express';
import { BookRequest, bookToResponse } from '../models/book';

/**
 * Repository contains all methods to persistence in db of respective model
 */
const bookRepository: IBookRepository = new BookRepository()

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

export const getById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const book = await bookRepository.getById(id)
    
    if(!book){
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json(book)
    }
    
    res
      .status(HttpStatusCode.CREATED)
      .json(bookToResponse(book))
  } catch (error: any) {
    res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: error.stack })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    
    const book = await bookRepository.getById(id)
    
    if(!book) return res
      .status(HttpStatusCode.NOT_FOUND)
      .json(book)
    
    const data: Partial<BookRequest> = req.body
    
    const bookToUpdate = {...book, ...data}
    if(data.publication_year) bookToUpdate.publicationYear = data.publication_year
    const bookUpdated = await bookRepository.update(bookToUpdate)
    
    res  
      .json(bookToResponse(bookUpdated))
  } catch (error: any) {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.stack})
  }
}

export const _delete = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    
    bookRepository._delete(id)
    res.status(HttpStatusCode.NO_CONTENT).json()
  } catch (error: any) {
    res
    .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
    .json({ message: error.stack})
  }
} 