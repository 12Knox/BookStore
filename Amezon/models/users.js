const express = require('express');
const router = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// Users
const Account = new Schema({
  user: { type: String, required: true },
  pass: { type: String, required: true },
}, { collection: 'users' });

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', Account);
