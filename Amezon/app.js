const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');

// ルート設定
const routes = require('./routes/index');
const mypage = require('./routes/mypage');
const usersModel = require('./models/users');
const booksModel = require('./models/books');

const app = express();

// View Engineを設定する
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Passport Setting
app.use(require('express-session')({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());

// Static Folder
app.use(express.static(`${__dirname}/public`));

app.use('/', routes);
app.use('/mypage', mypage);
app.use('/usersModel', usersModel);
app.use('/booksModel', booksModel);

// Passportのコンフィグ(公式ドキュメントどおり)
const users = require('./models/users');
passport.use(new LocalStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

// Mongoose
mongoose.connect('mongodb://localhost:27017/amezon');

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
