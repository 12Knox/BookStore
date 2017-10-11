const express = require('express');
const passport = require('passport');
const User = require('../models/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { });
});

router.post('/register', (req, res, next) => {
  console.log(1111);
  User.register(new User({ users: req.param.users }), req.param.password, (err, users) => {
    console.log(User);
    if (err) {
      return res.render('register', { error: err.message });
    }

    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/mypage');
      });
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user, error: req.flash('error') });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
  res.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('logout', (req, res) => {
  req.logout();
  req.session.save(() => {
    res.redirect('/');
  });
});

module.exports = router;
