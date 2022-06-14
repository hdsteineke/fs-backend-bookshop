const { response } = require('express');
const { Router } = require('express');
const Author = require('../models/Author');
module.exports = Router()

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const matchingAuthor = await Author.getById(id);
    res.json(matchingAuthor);
  })

  .get('/', async (req, res) => {
    const authorsData = await Author.getAll();
    const authors = authorsData.map((author) => { return { id: author.id, name: author.name, dob: author.dob, pob: author.pob }; });
    response.json(authors);
  });
