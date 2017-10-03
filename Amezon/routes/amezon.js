const express = require('express');
const router = express.Router();
const monk = require('monk');
const db = monk('localhost:27017/amezon');

router.get('/books', (req, res) => {
  res.render('amezon');
});

module.exports = router;
