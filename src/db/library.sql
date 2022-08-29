DROP TABLE IF EXISTS books;

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

VALUES DEFAULT
INSERT INTO BOOKS (name, book_description, publication_year, author, gender)
VALUES 
('Scream', 'Killer crazy', 2003, 'Yelena', 'terror'),
('El cielo de los perros', 'Donde van nuestras mascotas cuando mueren', 1987, 'Alexander', 'fantasia'),
('Engaño', 'La esposa de un pordiosero tiene una aventura', 2011, 'Camila', 'drama');