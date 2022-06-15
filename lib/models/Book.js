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
}

module.exports = Book;