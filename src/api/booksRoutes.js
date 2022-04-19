/* eslint-disable no-undef */
const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const booksRoutes = express.Router();

// routes
// POST /api/book/ - sukursim nauja knyga
booksRoutes.post('/book', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // paimti gautus duomenis
    console.log('req.body ===', req.body);
    const newBookObj = req.body;
    // su jais sukurti nauja knyga
    const collection = dbClient.db('library').collection('books');
    const insertResult = await collection.insertOne(newBookObj);
    res.status(201).json(insertResult);
  } catch (error) {
    console.error('error in creating a book', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// GET /api/book/ - grazina visas knygas
booksRoutes.get('/book', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // gauti visas knygas
    const collection = dbClient.db('library').collection('books');
    const allBooksArr = await collection.find().toArray();
    res.status(200).json(allBooksArr);
  } catch (error) {
    console.error('error in getting all books', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// GET /api/book-authors/ - grazina visas knygas
booksRoutes.get('/book-author', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // gauti visas knygas
    const collection = dbClient.db('library').collection('books');
    const allBooksArr = await collection
      .aggregate([
        {
          $lookup: {
            from: 'authors',
            localField: '_id',
            foreignField: 'bookId',
            as: 'authorArr',
          },
        },
      ])
      .toArray();
    console.log('allBooksArr ===', allBooksArr);
    res.status(200).json(allBooksArr);
  } catch (error) {
    console.error('error in getting all books', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// GET /api/book/:bookId - grazina knyga su id lygiu bookId
booksRoutes.get('/book/:bookId', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // gauti visas knygas
    const collection = dbClient.db('library').collection('books');
    const { bookId } = req.params;
    console.log('bookId ===', bookId);
    const bookById = await collection.find({ _id: ObjectId(bookId) }).toArray();
    console.log('bookById ===', bookById);
    res.status(200).json(bookById);
  } catch (error) {
    console.error('error in getting one book', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});
module.exports = booksRoutes;
