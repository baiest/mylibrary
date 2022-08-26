export interface Book {
  id: number
  name: string
  description: string
  publicationYear: number
  author: string
  gender: string
}

export interface BookDB extends Omit<Book, 'description' | 'publicationYear'>{
  book_description: string
  publication_year: number
} 

export interface BookCreate extends Omit<Book, 'id'>{}

export interface BookRequest extends Omit<BookCreate, 'publicationYear'>{
  publication_year: number
}

export interface BookResponse extends BookRequest {
  id: number
}

export interface IBookRepository {
  getAll(): Promise<Book[]>
  create(data: BookCreate): Promise<Book>
}

export const dbToBook = (book: BookDB): Book => {
  const data: any = {
    ...book,
    description: book.book_description,
    publicationYear: book.publication_year
  }
  delete data.publication_year
  delete data.book_description
  
  return data
}

export const bookToResponse = (book: Book): BookResponse => {
  const data: any  = {
    ...book,
    publication_year: book.publicationYear,
  }
  
  delete data.publicationYear
  delete data.book_description
  
  return data
}