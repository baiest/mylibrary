import { QueryConfig } from 'pg';
import { query } from './../db/db';
import { Book, BookCreate, IBookRepository, BookDB, dbToBook } from './../models/book';

export class BookRepository implements IBookRepository {
  async getAll(): Promise<Book[]>{
    try {
      const data: BookDB[] = await query("SELECT * FROM books")
      return data.map(dbToBook)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  
  async create(data: BookCreate): Promise<Book> {
    try {
      const q: QueryConfig = {
        text: `INSERT INTO books(
          book_description,
          publication_year,
          author,
          gender
        ) VALUES (
          $1,
          $2,
          $3,
          $4
        ) RETURNING *`,
        values: [
          data.description,
          data.publicationYear,
          data.author,
          data.gender
        ]
      }
      const res = await query(q)
      return dbToBook(res[0])
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  
  async getById(id: number){
    try {
      const q: QueryConfig = {
        text: "SELECT * FROM books WHERE id = $1",
        values: [id]
      }
      const res: BookDB[] = await query(q)     
      return res[0] ? dbToBook(res[0]) : null
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}