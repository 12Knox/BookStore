const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const app = express();

// ルート設定
const routes = require('./routes/index');
const mypage = require('./routes/mypage');
const login = require('./routes/login');
// const booksModel = require('./models/books');

// View Engineを設定する
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser('secret'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Passport Settings
app.use('/', routes);

const Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Mongoose
mongoose.connect('mongodb://localhost:27017/amezon');

// Static Folder
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/models`));

app.use('/', routes);
app.use('/login', login);
app.use('/mypage', mypage);
app.use('/usersModel', Account);
// app.use('/booksModel', booksModel);

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello! Welcome to Amezon!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`May node be with you at Galaxy ${port}`);
});

module.exports = app;
