const express = require('express');
const router = express.Router();

// indexを取得
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
