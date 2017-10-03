const express = require('express');
const router = express.Router();

// indexを取得
router.get('/', (req, res, next) => {
  res.render('index', { hoge: 'Hahaha!' });
});

router.get('/test/:id', (req, res, next) => {
  res.render('test', { output: req.params.id });
});

router.post('/test/submit', (req, res, next) => {
  const id = req.body.id;
  res.redirect('/test/' + id);
});

module.exports = router;
