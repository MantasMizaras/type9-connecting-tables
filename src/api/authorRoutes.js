// eslint-disable-next-line import/no-extraneous-dependencies
const { ObjectID } = require('bson');
const express = require('express');
const { dbClient } = require('../config');

const authorRoutes = express.Router();

// routes
// POST /api/author - sukuria nauja autoriu
authorRoutes.post('/author', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // paimti gautus duomenis
    console.log('req.body ===', req.body);
    const newAuthorObj = req.body;
    // su jais sukurti nauja knyga
    const collection = dbClient.db('library').collection('authors');
    const insertResult = await collection.insertOne(newAuthorObj);
    res.status(201).json(insertResult);
  } catch (error) {
    console.error('error in creating an author', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});
// GET /api/author - gauti visus autorius
authorRoutes.get('/author', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // gauti visas knygas
    const collection = dbClient.db('library').collection('authors');
    const allAuthorsArr = await collection.find().toArray();
    res.status(200).json(allAuthorsArr);
  } catch (error) {
    console.error('error in getting all authors', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});
// GET /api/author/:authorId - gauti konkretu autoiu
authorRoutes.get('/author/:authorId', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // gauti visas knygas
    const collection = dbClient.db('library').collection('authors');
    const { authorId } = req.params;
    console.log('authorIdToString ===', typeof authorId);
    const authorById = await collection.find({ _id: ObjectID(authorId) }).toArray();
    console.log('authorById ===', authorById);
    res.status(200).json(authorById);
  } catch (error) {
    console.error('error in getting one author', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});
module.exports = authorRoutes;
