const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('');
const Schema = mongoose.Schema;
const url = 'mongodb://localhost:27017/amezon';

// indexを取得
router.get('/', (req, res, next) => {
  res.render('index', { hoge: 'Welcome!' });
});

router.get('/get-data', (req, res, next) => {

});

router.post('/insert', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
});

router.post('/update', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const id = req.body.id;
});

router.post('/delete', (req, res, next) => {

});

module.exports = router;
