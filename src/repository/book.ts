import { QueryConfig } from 'pg';
import { query } from './../db/db';
import { Book, BookCreate, IBookRepository, BookDB, dbToBook } from './../models/book';

export class BookRepository implements IBookRepository {
  async getAll(): Promise<Book[]>{
    try {
      const data: BookDB[] = await query("SELECT * FROM books")
      const d = data.map(dbToBook)
      return d
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
        )`,
        values: [
          data.description,
          data.publicationYear,
          data.author,
          data.gender
        ]
      }
      const res = await query(q)
      return res[0]
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}