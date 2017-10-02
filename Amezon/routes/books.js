const express = require('express');
const router = express.Router();

const monk = require('monk');
const db = monk('localhost:27017/amezon');

(req, res) => {
  const collection = db.get('books');
  collection.find({}, (err, books) => {
    if(err) throw err;
    res.json(books);
  });
}

router.get('/api/books', (req, res) => {
  res.render('hogehoge');
});

module.exports = router;
