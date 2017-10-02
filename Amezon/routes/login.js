const express = require('express');
const router = express.Router();
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((username, password, done) => {
    // テスト用ユーザー
    const user = {id:"test", username:"user",password:"password"};

    // 認証。
    if(username===user.username && password===user.password){
        return newFunction(done);
    }else{
      return done(null, false, { message: 'ログインに失敗しました。' });
    }
  }
));

router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

router.post('/',
  passport.authenticate('local', {failureRedirect: '/login',
                                   failureFlash: false,
                                   session: false }),
  function(req, res, next){
    res.send("login success");
  }
);
module.exports = router;

function newFunction(done) {
    return done(null, true);
}

