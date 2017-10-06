const express = require('express');

const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/amezon');
const Schema = mongoose.Schema;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, 'public')));

const booksDataSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
}, { collection: 'books' });

const BooksData = mongoose.model('books', booksDataSchema);

// amezonを取得
router.get('/', (req, res) => {
  res.render('mypage', { message: `Welcome! ${users.username} さん` });
});

// データを取得する(MongoDBから引っ張ってくる)
router.get('/book-lists', (req, res) => {
  BooksData.find()
    .then((doc) => {
      res.render('book-lists', { items: doc });
    });
});

// 本を登録して、Registeredページに飛ばす
router.post('/book-lists', (req, res) => {
  // それぞれの変数にインプットタグで入れたコンテンツを代入する
  const { title } = req.body;
  const { content } = req.body;
  const { author } = req.body;
  const item = { title, content, author };
  const data = new BooksData(item);
  data.save();
  res.redirect('/book-lists');
});

router.post('/update', (req, res) => {
  const { id } = req.body;
  BooksData.findById(id, (err, doc) => {
    if (err) {
      console.error('エラー！記事が見つかりません！');
    } else {
      doc.title = req.body.title;
      doc.content = req.body.content;
      doc.author = req.body.author;
      doc.save();
    }
  });
  res.redirect('/');
});

router.post('/delete', (req, res) => {
  const { id } = req.body;
  BooksData.findByIdAndRemove(id).exec();
  res.redirect('mypage');
});

module.exports = router;
