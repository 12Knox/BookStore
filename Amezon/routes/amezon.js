const express = require('express');
const router = express.Router();
const monk = require('monk');
const db = monk('localhost:27017/amezon');

router.get('/books', (req, res) => {
  res.render('amezon');
});

router.get('/books', (req, res) => {
  const collection = db.get('books');
  collection.find({}, (err, books) => {
    if(err) throw err;
    res.json(books);
  });
});

router.post('/', (req, res) => {
  const collection = db.get('books');
  collection.insert({
    title: req.body.title,
    description: req.body.description,
  }, (err, books) => {
    if (err) throw err;
    res.json(books);
  });
});

module.exports = router;
