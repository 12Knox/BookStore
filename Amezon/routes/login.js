const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', {
    error: req.flash('error'),
    input_id: req.flash('input_id'),
    input_password: req.flash('input_password'),
  });
});

router.post('/login', (req, res, next) => {
  console.log(111);
  passport.authenticate('local', {
    successRedirect: '/mypage',
    failureRedicrect: '/',
    failreFlash: true,
  })(req, res, next);
});

module.exports = router;
