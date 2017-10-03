const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
mongoose.connect('localhost:27017/amezon');
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
}, { collection: 'user-data' });

const UserData = mongoose.model('userData', userDataSchema);

// indexを取得
router.get('/', (req, res, next) => {
  res.render('index', { hoge: 'Welcome!' });
});

router.get('/get-data', (req, res, next) => {
  UserData.find()
    .then((doc) => {
      res.render('index', { items: doc });
    })
});

router.post('/register', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const data = new UserData(item);
  data.save();
  res.redirect('/');
});

router.post('/update', (req, res, next) => {
  UserData.findById(id, (err, doc) => {
    if (err) {
      console.error('エラー！記事が見つかりません！');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    doc.save();
  });
  res.redirect('/');
});

router.post('/delete', (req, res, next) => {
  const id = req.body.id;
  UserData.findByIdAndRemove(id).exec();
  res.redirect('index');
});

module.exports = router;
