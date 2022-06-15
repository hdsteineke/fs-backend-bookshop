const { Router } = require('express');
const Book = require('../models/Book');
module.exports = Router()

  .get('/', async (req, res, next) =>  {
    try {
      const booksData = await Book.getAll();
      res.json(booksData);
    }
    catch (error) {
      next (error);
    }
  });
