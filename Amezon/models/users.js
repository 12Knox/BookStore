const express = require('express');

const router = express();
const mongoose = require('mongoose');

const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

// Users
const AccountSchema = new Schema({
  id: { type: String, required: true },
  password: { type: String, required: true },
  updated_at: { type: Date },
  created_at: { type: Date },
}, { collection: 'users' });

AccountSchema.pre('save', (next) => {
  const now = new Date();
  this.update_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

// Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', AccountSchema);
