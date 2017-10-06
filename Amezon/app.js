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
const register = require('./routes/core');

// app.use(passport.initialize());
app.use('/', index);
app.use('/mypage', mypage);
app.use('/core', register);

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello! Welcome to Amezon!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`May node be with you at Galaxy ${port}`);
});

module.exports = app;
