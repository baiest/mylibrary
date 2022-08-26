DROP TABLE books;
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  book_description VARCHAR(255) NOT NULL,
  plublication_year INTEGER NOT NULL,
  author VARCHAR(100) NOT NULL,
  gender VARCHAR(100)
);