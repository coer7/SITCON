var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_REG = '註冊';

router.get('/', function(req, res) {
  res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
  var userName = req.body['id'],
      userPwd = req.body['pw'],
      userRePwd = req.body['pw2'],     
      md5 = crypto.createHash('md5');
 
      userPwd = md5.update(userPwd).digest('hex');

  var newUser = new User({
      username: id,
      userpass: pw,
  });
});
module.exports = router
