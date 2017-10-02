const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');

// View Engineを設定する
app.set('view engine', 'ejs');

// Staticフォルダー
app.use(express.static(path.join(__dirname, 'public')));

// ルート設定
const routes = require('./routes/index');
const users = require('./routes/users');
const books = require('./routes/books');
const login = require('./routes/login');

// app.use(passport.initialize());
app.use('/', routes);
app.use('/users', users);
app.use('/api/books', books);
app.use('/login', login);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Connected on port : ${ port }`);
});

// Passport 設定
// app.use(passport.session());

module.exports = app;
