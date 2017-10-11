const express = require('express');
const router = express();
const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// Users
const Users = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { collection: 'users' });

Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', Users);
