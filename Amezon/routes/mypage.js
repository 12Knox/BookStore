const express = require('express');
const router = express.Router();

router.get('/mypage', (req, res, next) => {
  res.send('hogehoge');
});

module.exports = router;
