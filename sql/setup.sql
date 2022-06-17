-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors_books;
-- DROP TABLE IF EXISTS

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    dob VARCHAR,
    pob VARCHAR
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released INT
);

INSERT INTO authors (
    name,
    dob,
    pob
)

VALUES
('Robin Wall Kimmerer', '01/01/1953', 'New York, NY'),
('Philip Pullman', '10/19/1946', 'Norwich, England'),
('Yann Martel', '06/25/1963', 'Salamanca, Spain'),
('adrienne maree brown', '11/06/1978', 'El Paso, TX'),
('Dossie Easton', '02/26/1944', 'Andover, MA'),
('Janet Hardy', 'Not Provided', 'Not Provided'),
('David Abram', '06/24/1957', 'Nassau County, NY')
;

INSERT INTO books (
    title,
    released
)
VALUES
  ('Braiding Sweetgrass', 2013),
  ('The Golden Compass', 1995),
  ('The Subtle Knife', 1997),
  ('The Amber Spyglass', 2000),
  ('Life of Pi', 2001),
  ('The Ethical Slut', 1997),
  ('Pleasure Activism', 2019),
  ('Spell of the Sensuous', 1996)
  ;

  CREATE table authors_books(
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT,
    book_id BIGINT,
    FOREIGN KEY (author_id) REFERENCES authors(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
  );

  INSERT INTO authors_books (author_id, book_id) VALUES
  (1, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (3, 5),
  (4, 7),
  (5, 6),
  (6, 6),
  (7, 8)
  ;