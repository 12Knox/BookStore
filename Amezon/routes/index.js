const express = require('express');
const passport = require('passport');
// const Users = require('../models/users');

const router = express.Router();


// router.get('/', (req, res) => {
//   res.render('index', { user : req.user });
// });

// router.get('/register', (req, res) => {
//   res.render('register', { });
// });

// router.post('/register', (req, res, next) => {
//   console.log(Users[0]);
//   Users.register(new Users({ username: req.body.username }), req.body.password, (err) => {
//     if (err) {
//       console.log('errrrrrrrroooooooooooooooooooooooooooor');
//       return res.render('register', { error: err.message });
//     }

//     passport.authenticate('local')(req, res, () => {
//       req.session.save((err) => {
//         if (err) {
//           return next(err);
//         }
//         res.redirect('/');
//       });
//     });
//   });
// });


// router.get('/login', (req, res) => {
//   res.render('login', { user : req.user, error : req.flash('error')});
// });

// router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res, next) => {
//   req.session.save((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

// router.get('/logout', (req, res, next) => {
//   req.logout();
//   req.session.save((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

module.exports = router;
