const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    const robin = res.body.find((author) => author.id === '1');
    expect(res.body.length).toEqual(7);
    expect(robin).toHaveProperty('name', 'Robin Wall Kimmerer');
    expect(robin).toHaveProperty('dob', '01/01/1953');
    expect(robin).toHaveProperty('pob', 'New York, NY');
  });


  it('should return details of a specific author', async () => {
    const res = await request(app).get('/authors/3');
    const yann = {
      id: '3',
      name: 'Yann Martel',
      dob: '06/25/1963',
      pob: 'Salamanca, Spain',
      books: [{
        id: 5,
        released: 2001,
        title: 'Life of Pi'
      }]
    };

    expect(res.body).toEqual(yann);
  });


  it('should return list of books', async () => {
    const res = await request(app).get('/books');
    const sweetgrass = res.body.find((book) => book.id === '1');
    expect(res.body.length).toEqual(8);
    expect(sweetgrass).toHaveProperty('title', 'Braiding Sweetgrass');
  });

  it('should return a specific book detail', async () => {
    const res = await request(app).get('/books/2');
    const compass = {
      authors: [{
        dob: '10/19/1946',
        id: 2,
        name: 'Philip Pullman',
        pob: 'Norwich, England'
      }],
      id: '2',
      title: 'The Golden Compass',
      released: 1995
    };

    expect(res.body).toEqual(compass);

  });

  it('POST /books should create a new book', async () => {
    const res = await request(app).post('/books').send({ title: 'The Secret Garden', released: 1911 });

    expect(res.body.title).toBe('The Secret Garden');
  });



  afterAll(() => {
    pool.end();
  });
});
