const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(express.static(path.join(__dirname, 'public')));

// Books
const booksDataSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
}, { collection: 'books' });

exports.Books = mongoose.model('books', booksDataSchema);

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

// Updateする場所
// router.post('/update', (req, res) => {
//   const { id } = req.body;
//   BooksData.findById(id, (err, doc) => {
//     if (err) {
//       console.error('エラー！本が見つかりません！');
//     } else {
//       doc.title = req.body.title;
//       doc.content = req.body.content;
//       doc.author = req.body.author;
//       doc.save();
//     }
//   });
//   res.redirect('/');
// });

// router.post('/delete', (req, res) => {
//   const { id } = req.body;
//   BooksData.findByIdAndRemove(id).exec();
//   res.redirect('mypage');
// });

module.exports = mongoose.model('books', booksDataSchema);
