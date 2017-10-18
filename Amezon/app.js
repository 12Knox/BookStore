// const express = require('express');
// const path = require('path');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const flash = require('connect-flash');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const crypto = require('crypto');

// const app = express();

// // ルート設定
// const routes = require('./routes/index');
// const mypage = require('./routes/mypage');
// const login = require('./routes/login');
// // const usersModel = require('./models/users');
// // const booksModel = require('./models/books');

// // View Engineを設定する
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(cookieParser('secret'));
// app.use(session());
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport Setting
// app.use(require('express-session')({
//   secret: 'Keyboard cat',
//   resave: false,
//   saveUninitialized: false,
// }));

// app.use('/', routes);

// const Account = require('./models/account');

// passport.use(new LocalStrategy(Account.authenticate()));
// passport.serializeUser(Account.serializeUser());
// passport.deserializeUser(Account.deserializeUser());

// // Mongoose
// mongoose.connect('mongodb://localhost:27017/amezon');

// // Static Folder
// app.use(express.static(`${__dirname}/public`));

// app.use('/', routes);
// app.use('/login', login);
// app.use('/mypage', mypage);
// // app.use('/usersModel', usersModel);
// // app.use('/booksModel', booksModel);

// app.get('/', (req, res) => {
//   res.render('index', { message: 'Hello! Welcome to Amezon!' });
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`May node be with you at Galaxy ${port}`);
// });

// module.exports = app;

// dependencies
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let flash = require('connect-flash');

let routes = require('./routes/index');
let users = require('./routes/users');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// passport config
const AccountDataSchema = require('./models/account');

passport.use(new LocalStrategy(AccountDataSchema.authenticate()));
passport.serializeUser(AccountDataSchema.serializeUser());
passport.deserializeUser(AccountDataSchema.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`May node be with you at Galaxy ${port}`);
});

module.exports = app;
