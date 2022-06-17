const { Router } = require('express');
const Author = require('../models/Author');
module.exports = Router()

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const matchingAuthor = await Author.getById(id);
      res.json(matchingAuthor);
    }
    catch (error) {
      next (error);
    }
  })


  .get('/', async (req, res, next) => {
    try {
      const authorsData = await Author.getAll();
      res.json(authorsData);
    }
    catch (error) {
      next (error);
    }
  })
  
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      res.json(author);
    } catch (error) {
      next(error);
    }
  });
