'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
const Schema = mongoose.Schema;

const articleSchema = Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  userID: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
