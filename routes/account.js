const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.post('/reg', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({success: false, msg: "User not added"});
    } else {
      res.json({success: true, msg: "User added"});
    }
  });
});

router.post('/auth', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log(req.body);

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: "Username or password not correct"});
    }
    User.comparePass(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 3600 * 24
        });
        var decoded = jwt.verify(token, config.secret);
        console.log(decoded)
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            username: user.username
          }
        })
      } else {
        return res.json({success: false, msg: "Username or password not correct"});
      }
    });
  });
});

router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send('Dashboard');
})

module.exports = router;
