DROP TABLE books;
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  book_description VARCHAR(255) NOT NULL,
  publication_year INTEGER NOT NULL,
  author VARCHAR(100) NOT NULL,
  gender VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);