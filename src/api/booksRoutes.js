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

booksRoutes.get('/book-agg2', async (req, res) => {
  try {
    const aggPipeline = [
      {
        $lookup: {
          from: 'authors',
          localField: '_id',
          foreignField: 'bookId',
          as: 'bookAuthorArr',
        },
      },
      {
        $sort: {
          rating: -1,
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              {
                $arrayElemAt: ['$bookAuthorArr', 0],
              },
              '$$ROOT',
            ],
          },
        },
      },
      {
        $project: {
          bookAuthorArr: 0,
        },
      },
    ];
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // gauti visas knygas
    const collection = dbClient.db('library').collection('books');
    const allBooksArr = await collection.aggregate(aggPipeline).toArray();
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
    const authorsWithBooksArr = allBooksArr.map((bookObj) => {
      if (!bookObj.authorArr.length === 0) {
        return bookObj;
      }
      return {
        title: bookObj.title,
        year: bookObj.year,
        rating: bookObj.rating,
        // eslint-disable-next-line max-len
        authorName: bookObj.authorArr[0].name, // arba klaustukas kaip zemiau , arba su if kaip si eilute
        authorTown: bookObj.authorArr[0]?.town,
      };
    });
    console.log('authorsWithBooksArr ===', authorsWithBooksArr);
    res.status(200).json(authorsWithBooksArr);
  } catch (error) {
    console.error('error in getting all books', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

// GET /api/book/:bookId - grazina knyga su id lygiu bookId
// booksRoutes.get('/book/:bookId', async (req, res) => {
//   console.log('single book routes');
//   try {
//     // prisijungti
//     await dbClient.connect();
//     // atlikti veiksma
//     console.log('connected');
//     // gauti visas knygas
//     const collection = dbClient.db('library').collection('books');
//     const { bookId } = req.params;
//     console.log('bookId ===', bookId);
//     const bookById = await collection.findOne(ObjectId(bookId));
//     console.log('bookById ===', bookById);
//     res.status(200).json(bookById);
//   } catch (error) {
//     console.error('error in getting one book', error);
//     res.status(500).json('something is wrong');
//   } finally {
//     // uzdaryti prisijungima
//     await dbClient.close();
//   }
// });

// DELETE /api/book/:delBookId - istrinam knyga kurios id === delBookId
booksRoutes.delete('/book/del/:delBookId', async (req, res) => {
  console.log('deleting');
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
    // gauti visas knygas
    const collection = dbClient.db('library').collection('books');
    const { delBookId } = req.params;
    console.log('delBookId ===', delBookId);
    const deleteResult = await collection.deleteOne({ _id: ObjectId(delBookId) });
    console.log('deleteResult ===', deleteResult);
    res.status(200).json(deleteResult);
  } catch (error) {
    console.error('error in getting one book', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
  }
});

module.exports = booksRoutes;
