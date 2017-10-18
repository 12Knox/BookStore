const express = require('express');
const router = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const AccountDataSchema = new Schema({
  username: String,
  password: String,
}, { collection: 'accounts' });

exports.Account = mongoose.model('accounts', AccountDataSchema);

AccountDataSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', AccountDataSchema);
