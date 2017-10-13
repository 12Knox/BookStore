const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const crypto = require('crypto');

const app = express();

// ルート設定
const routes = require('./routes/index');
const mypage = require('./routes/mypage');
const login = require('./routes/login');
// const usersModel = require('./models/users');
// const booksModel = require('./models/books');

app.use(session({ secret: '19901212' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require('passport-local').Strategy;

// Passportのコンフィグ(公式ドキュメントどおり)
const users = require('./models/users');

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
  passReqToCallback: true,
}, ((req, name, password, done) => {
    const Account = mongoose.model('users');
    Account.findOne({ 'id': name }, ((err, users) => {
      if (err) return done(err);
      if (!account) {
        req.flash('error', 'ユーザーが見つからないねん');
        req.flash('input_id', name);
        req.flash('input_password', password);
        return done(null, false);
      }
      const hashedPassword = getHash(password);
      if (user.password != hashedPassword && users.password != password) {
        req.flash('error', 'パスワードちゃうねん！');
        req.flash('input_id', name);
        req.flash('input_password', password);
        return done(null, false);
      }
      return done(null, users);
    }));
  })));


const getHash = ((value) => {
  const pwd = crypto.createHmac('sha256', 'secretKey');
  pwd.update(value);
  return pwd.digest('hex');
});

passport.serializeUser((users, done) => {
  done(null, users.id('hex'));
});
passport.deserializeUser((serializedAccount, done) => {
  const Account = mongoose.model('users');
  Account.findOne({ 'id': serializedAccount }, ((err, users) => {
    done(err, users.id);
  }));
});

// View Engineを設定する
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Passport Setting
app.use(require('express-session')({
  secret: 'Keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

// Static Folder
app.use(express.static(`${__dirname}/public`));

app.use('/', routes);
app.use('/login', login);
app.use('/mypage', mypage);
// app.use('/usersModel', usersModel);
// app.use('/booksModel', booksModel);

// Mongoose
mongoose.connect('mongodb://localhost:27017/amezon');

app.get('/', (req, res) => {
  res.render('index', { message: 'Hello! Welcome to Amezon!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`May node be with you at Galaxy ${port}`);
});

module.exports = app;
