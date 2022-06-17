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
  })
  
  
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const matchingBook = await Book.getById(id);
      res.json(matchingBook);
    }
    catch(error) {
      next (error);
    }
  });
