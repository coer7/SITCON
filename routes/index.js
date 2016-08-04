var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express register' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express login' });
});

router.get('/personal_page', function(req, res, next) {
  res.render('personal_page', { title: 'Express personal' });
});
module.exports = router;
