'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect(process.env.MONGODB_URI);

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  if (this.isNew) {
    bcrypt.hash(this.password, 10, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      console.log(hash);
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('User', userSchema);
