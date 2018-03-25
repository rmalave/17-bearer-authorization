'use strict';

const bearerMiddleware = require('../lib/bearer-middleware');
const express = require('express');
const router = express.Router();
const Article = require('../model/article');

router
  .route('/articles', bearerMiddleware)
  .get((req, res) => {
    console.log(req);
    Article.find()
      .then(articles => {
        console.log(articles);
        res.json(articles);
      })
      .catch(err => res.send(err.message));
  })

  .post((req, res) => {
    new Article(req.body)
      .save()
      .then(article => {
        console.log(article);
        res.json(article);
      })
      .catch(err => res.send(err.message));
  });

router
  .route('/article/:_id', bearerMiddleware)
  .get((req, res) => {
    Article.findById(req.params._id)
      .then(article => res.send(article))
      .catch(err => res.send(err.message));
  })
  .put((req, res) => {
    Article.findByIdAndUpdate(req.params._id)
      .then(res.send('Article successfuly updated'))
      .catch(err => res.send(err.message))

      .delete((req, res) => {
        Article.findOneAndRemove({ _id: req.params._id }).then(
          res.send('Successfuly removed article with id: ' + req.params._id)
        );
      });
  });

module.exports = router;
