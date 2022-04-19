/**
 * from: The target collection. SU KOKIA LENTELE JUNGIAM
 * localField: The local join field. VIETINIS LAUKAS KURIS YRA VIENODAS SU KITOS LENTELES LAUKU
 * foreignField: The target join field. KITOS LENTELES LAUKAS LYGUS localField 
 * as: The name for the results.
 * pipeline: The pipeline to run on the joined collection.
 * let: Optional variables to use in the pipeline field stages.
 */
 {
    from: 'authors',
    localField: '_id',
    foreignField: 'bookId',
    as: 'author'
  }

//   const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// /*
//  * Requires the MongoDB Node.js Driver
//  * https://mongodb.github.io/node-mongodb-native
//  */

// const agg = [
//   {
//     '$lookup': {
//       'from': 'authors', 
//       'localField': '_id', 
//       'foreignField': 'bookId', 
//       'as': 'author'
//     }
//   }
// ];

// MongoClient.connect(
//   'mongodb+srv://MantasMizaras:mantas123@cluster0.iwhnx.mongodb.net/node7?retryWrites=true&w=majority',
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   function(connectErr, client) {
//     assert.equal(null, connectErr);
//     const coll = client.db('library').collection('books');
//     coll.aggregate(agg, (cmdErr, result) => {
//       assert.equal(null, cmdErr);
//     });
//     client.close();
//   });