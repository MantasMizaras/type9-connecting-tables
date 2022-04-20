const obj1 = {
  _id: '625e64cdb0d281db9cb103f1',
  title: 'Book 1',
  year: 2000,
  rating: 4,
  authorArr: [
    {
      _id: '625e6a3eb93cf588ce6977e4',
      name: 'James book1',
      town: 'London',
      bookId: '625e64cdb0d281db9cb103f1',
    },
  ],
};

// obj1.authorName = obj1.authorArr[0].name;
// obj1.authorTown = obj1.authorArr[0].town;
// delete obj1.authorArr;

const objCopy = {
  title: obj1.title,
  year: obj1.year,
  rating: obj1.rating,
  authorName: obj1.authorArr[0].name,
  authorTown: obj1.authorArr[0].town,
};
console.log('obj1 ===', obj1);

const result = {
  _id: '625e64e2b0d281db9cb103f2',
  title: 'Book 2',
  year: 2010,
  rating: 2,
  Name: 'James book1',
  town: 'London',
};
