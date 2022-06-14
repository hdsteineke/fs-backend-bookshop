const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    row.books 
      ? (this.books = row.books)
      : null;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO owners (name, dob, pob) VALUES ($1, $2, $3) RETURNING *', [name, dob, pob]
    );
    return new Author(rows[0]);
  }

  async addBookById(id) {
    await pool.query(
      'INSERT INTO authors_books (author_id, book_id) VALUES ($1, $2) RETURNING *', [this.id, id]
    );
    return this;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from authors'
    );
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT
          authors.*,
          COALESCE(
              json_agg(to_jsonb(books))
              FILTER (WHERE books.id IS NOT NULL), '[]'
          ) as books from authors
          LEFT JOIN authors_books on authors.id = authors_books.author_id
          LEFT JOIN books on authors_books.book_id = books.id
          WHERE authors.id = $1
          GROUP by authors.id`,
      [id]
    );
    return new Author(rows[0]);
  }
}

module.exports = Author;
