const express = require('express');
const router = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// Users
const User = new Schema({
  user: { type: String, required: true },
  pass: { type: String, required: true },
}, { collection: 'users' });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
