'use strict';

const express = require('express');
const User = require('../model/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router
  .route('/signup')
  .get((req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => res.send(err.message));
  })

  .post((req, res) => {
    new User(req.body)
      .save()
      .then(user => res.json(user))
      .catch(err => res.sendStatus(400).send(err.message));
  });

router.route('/signin').get((req, res) => {
  let authHeader = req.get('Authorization');
  console.log('header:', authHeader);
  if (!authHeader) {
    res.send('Must provide a username/password');
  }

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  User.findOne({ username: username })
    .then(user => {
      console.log(user);
      if (user === null) {
        res.send('user not found');
      }
      bcrypt.compare(password, user.password, (err, isValid) => {
        console.log('password: ', password, 'user password: ', user.password);
        if (err) {
          res.send('Authentication failed: ' + err.message);
        }

        if (!isValid) {
          res.status(401).send('Not a valid password: ' + err);
          return;
        }

        let payload = { userId: user._id };

        let token = jwt.sign(payload, process.env.APP_SECRET);
        console.log('token from /signin: ', token);
        res.send({ auth: true, token: token });
      });
    })
    .catch(err => res.send(err.message));

  console.log('credentials:', username, password);
});

module.exports = router;
