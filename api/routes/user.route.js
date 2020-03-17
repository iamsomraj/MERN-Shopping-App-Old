const express = require('express');
const User = require('../models/user.model');
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/login.authentication');

Router.route('/signup').post((req, res, next) => {
  User.find({ username: req.body.username }).then(user => {
    if (user.length >= 1) {
      return res.status(409).json({
        message: 'Username already exists'
      });
    } else {
      bcrypt.hash(req.body.password, 10, (error, hash) => {
        const user = new User({
          username: req.body.username,
          password: hash
        });
        user
          .save()
          .then(() => {
            const message = 'A new user is created'.toUpperCase();
            res.status(200).json({
              message: message,
              createdUser: user
            });
          })
          .catch(error => {
            res.status(500).json({
              message: error.message
            });
          });
      });
    }
  });
});

Router.route('/login').post((req, res, next) => {
  User.find({ username: req.body.username }).then(user => {
    if (user.length <= 0) {
      return res.status(404).json({
        message: 'Username does not exist'
      });
    } else {
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            message: error.message
          });
        }

        if (result) {
          const token = jwt.sign(
            {
              id: user[0]._id,
              username: user[0].username,
              password: user[0].password
            },
            process.env.JWT_ENV || 'jwt123',
            {
              expiresIn: '6h'
            }
          );
          const message = 'A user is logged in'.toUpperCase();
          res.status(200).json({
            message: message,
            user: user[0]._id,
            token: token
          });
        } else {
          return res.status(401).json({
            message: 'User authentication failed'
          });
        }
      });
    }
  });
});

Router.route('/:userId').delete(auth, (req, res, next) => {
  const id = req.params.userId;
  User.deleteOne({ _id: id, _id: req.userData.id })
    .then(response => {
      if (response.deletedCount > 0) {
        const message = 'a user is successfully deleted'.toUpperCase();
        res.status(200).json({
          message: message,
          deletedUserId: id,
          response: response
        });
      } else {
        const error = new Error('Unauthorised access');
        return res.status(401).json({
          message: error.message
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: error.message
      });
    });
});

module.exports = Router;
