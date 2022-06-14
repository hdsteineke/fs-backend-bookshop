const { Router } = require('express');
const Author = require('../models/Author');
module.exports = Router()

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const matchingAuthor = await Author.getById(id);
    res.json(matchingAuthor);
  })


  .get('/', async (req, res, next) => {
    try {
      const authorsData = await Author.getAll();
      res.json(authorsData);
    }
    catch (error) {
      next (error);
    }
  });
