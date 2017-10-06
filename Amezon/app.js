const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');

// View Engineを設定する
app.set('view engine', 'ejs');

// Static Folder
app.use(express.static(`${__dirname}/public`));

// ルート設定
const index = require('./routes/index');
const mypage = require('./routes/mypage');
const model = require('./routes/model');

app.use('/', index);
app.use('/mypage', mypage);
app.use('/model', model);

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello! Welcome to Amezon!' });
});

app.get('/mypage', (req, res) => {
  res.render('mypage');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`May node be with you at Galaxy ${port}`);
});

module.exports = app;
