const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/amezon');
const Schema = mongoose.Schema;

const usersDataSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { collection: 'users' });

const UsersData = mongoose.model('users', usersDataSchema);

router.get('/mypage', (req, res) => {
  UsersData.find()
    .then((doc) => {
      res.render('mypage', { users: doc });
    });
});

router.post('/mypage', (req, res) => {
  const { username } = req.body;
  const { password } = req.body;
  const userInfo = { username, password };
  const data = new UsersData(userInfo);
  data.save();
});

module.exports = router;
