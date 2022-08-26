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
          name,
          book_description,
          publication_year,
          author,
          gender
        ) VALUES (
          $1,
          $2,
          $3,
          $4,
          $5
        ) RETURNING *`,
        values: [
          data.name,
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
      const res = await query(q)     
      return res[0] ? dbToBook(res[0]) : null
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  
  async update(data: Partial<Book>){
    try {
      console.log(data)
      const q: QueryConfig = {
        text: `UPDATE books SET 
        name=$1,
        book_description=$2,
        publication_year=$3,
        author=$4,
        gender=$5,
        updated_at=NOW()
        WHERE id = $6
        RETURNING *
        `,
        values: [
          data.name,
          data.description,
          data.publicationYear,
          data.author,
          data.gender,
          data.id
        ]
      }
      const res = await query(q)
      return dbToBook(res[0])     
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
  
  async _delete(){
    
  }
}