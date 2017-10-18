const mongoose = require('mongoose');

const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
  username: String,
  password: String,
}, { collection: 'accounts' });

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
