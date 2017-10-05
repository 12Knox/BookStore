const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');

// View Engineを設定する
app.set('view engine', 'ejs');

// Static Folder
app.use(express.static(__dirname + '/public'));

// ルート設定
const routes = require('./routes/index');
const users = require('./routes/users');
const login = require('./routes/login');

// app.use(passport.initialize());
app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`May node be with you at Galaxy ${port}`);
});

// Passport
app.post('/login', passport.authenticate('local', {
  successRedirect: 'bookResgiter',
  failureRedirect: 'login',
  failureFlash: true,
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, (username, password, done) => {
  
}));

module.exports = app;
