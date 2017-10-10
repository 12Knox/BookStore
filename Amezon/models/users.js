const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Users
const usersDataSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'books' }],
}, { collection: 'users' });

// 本を登録して、Registeredページに飛ばす
router.post('/book-lists', (req, res) => {
  // それぞれの変数にインプットタグで入れたコンテンツを代入する
  const { username } = req.body;
  const { password } = req.body;
  const item = { title, content, author };
  const data = new UsersData(item);
  data.save();
  res.redirect('/mypage');
});

usersDataSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', usersDataSchema);
