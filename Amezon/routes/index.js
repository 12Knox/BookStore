const express = require('express');
const router = express.Router();

// indexを取得
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
 });

module.exports = router;
