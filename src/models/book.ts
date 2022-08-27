export interface Book {
  id: number
  name: string
  description: string
  publicationYear: number
  author: string
  gender: string
  createdAt: Date
  updatedAt: Date
}

export interface BookDB extends Omit<Book, 
'description' | 'publicationYear' | 'createdAt' | 'updatedAt'
>{
  book_description: string
  publication_year: number
  created_at: Date
  updated_at: Date
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
  getById(id: number): Promise<Book | null>
  update(data: Partial<BookCreate>): Promise<Book>
  _delete(id: number): void
}

export const dbToBook = (book: BookDB): Book => {
  const data: any = {
    ...book,
    description: book.book_description,
    publicationYear: book.publication_year,
    createdAt: book.created_at,
    updatedAt: book.updated_at
  }
  delete data.publication_year
  delete data.book_description
  delete data.created_at
  delete data.updated_at
  
  return data
}

export const bookToResponse = (book: Book): BookResponse => {
  const data: any  = {
    ...book,
    publication_year: book.publicationYear,
    created_at: book.createdAt,
    updated_at: book.updatedAt
  }
  
  delete data.publicationYear
  delete data.book_description
  delete data.createdAt 
  delete data.updatedAt
  
  return data
}