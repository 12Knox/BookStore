const express = require('express');
const router = express.Router();
const passport = require('passport');
const Users = require('../models/users');

router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { });
});

router.post('/register', (req, res, next) => {
  Users.register(new Users({ username: req.body.username }), req.body.password, (err, users) => {
    if (err) {
      return res.render('register', { error: err.message });
    }

    passport.authenticate('local')(req, res, () => {
      res.session.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user, error: req.flash('error') });
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
  res.session.save((err) => {
    if(err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('logout', (req, res, next) => {
  req.logout();
  req.session.save((err) => {
    if(err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
