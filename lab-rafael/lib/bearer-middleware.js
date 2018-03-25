'use strict';

const jwt = require('jsonwebtoken');
const User = require('../model/user');

module.exports = (req, res, next) => {
  let authHeader = req.headers.authorization;
  let token = authHeader.split('Bearer ')[1];
  console.log('jwt authHeader:', authHeader);
  console.log('jwt token:', token);

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    console.log(decoded);
    if (err) res.send(err.message);

    User.findOne({ _id: decoded.userId })
      .then(user => {
        console.log(user);
        req.user = user;
        next();
      })
      .catch(err => res.send(err.message));
  });
};
