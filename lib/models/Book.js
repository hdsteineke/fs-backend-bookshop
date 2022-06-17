const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    row.authors
      ? (this.authors = row.authors)
      : null;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from books'
    );
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
        books.*,
        COALESCE(
          json_agg(to_jsonb(authors))
          FILTER (WHERE authors.id IS NOT NULL), '[]'
        ) AS authors FROM books
        LEFT JOIN authors_books ON books.id = authors_books.book_id
        LEFT JOIN authors ON authors_books.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
      [id]
    );
    return new Book(rows[0]);
  }


  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING *', [title, released]
    );
    return new Book(rows[0]);
  }
}

module.exports = Book;


