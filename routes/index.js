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

router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
      var objKey = Object.keys(docs);
	  console.log(objKey);
      objKey.forEach(function(objectid){
        var items = Object.keys(docs[objectid]);
        items.forEach(function(itemkey) {
          var itemvalue =docs[objectid][itemkey];
          console.log(objectid+': '+itemkey+' = '+itemvalue);
        })
      })
      res.render('userlist', {
          "userlist" : docs
      });
	  //res.send(JSON.stringify(docs));
    });
});
/* POST to Add User Service 
router.post('/register', function(req, res) {
	console.log("Enter!")
    // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
	console.log(userName);
    var passWord = req.body.password;
	console.log(passWord);
    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
        "username" : userName,
        "password" : passWord
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});*/
// POST to Add User Service 
router.post('/register', function(req, res) {
	console.log('testttt');
	if(req.body.password != req.body.password2){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body.password);
		console.log('第二次輸入的密碼：' + req.body.password2);
		return res.redirect('/register');
	}else{
		console.log("Enter!")
		// Set our internal DB variable
		var db = req.db;
		// Get our form values. These rely on the "name" attributes
		var userName = req.body.username;
		console.log(userName);
		var passWord = req.body.password;
		console.log(passWord);
		// Set our collection
		var collection = db.get('usercollection');
		// Submit to the DB
		collection.insert({
			"username" : userName,
			"password" : passWord
		}, function (err, doc) {
			if (err) {
				// If it failed, return error
				res.send("There was a problem adding the information to the database.");
			}
			else {
				// If it worked, set the header so the address bar doesn't still say /adduser
				res.location("userlist");
				// And forward to success page
				res.redirect("userlist");
			}
		});
			
	}
	
});
router.post('/login', function(req, res) {
	if(req.body.password != req.body.password2){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body.password);
		console.log('第二次輸入的密碼：' + req.body.password2);
		return res.redirect('/login');
	}else{
		console.log("123");
		
		var db = req.db;
		var bool=true;
		var collection = db.collection('usercollection');
		var userName = req.body.username;
		//console.log("userName= "+userName);
		var passWord = req.body.password;
		//console.log("passWord= "+passWord);
		collection.find({},{},function(e,docs){
			var objKey = Object.keys(docs);
			for( var i=0;i<objKey.length;i++){
			  if(userName == docs[i].username){
				bool=false;
				console.log("Hello! " + userName);
				console.log("Your password is "+passWord)
				//res.cookie('username', req.body.username, { signed: true});		
				//res.cookie('name', 'tobi', { signed: true });
				res.render('index',{signed:!!req.body.username});
				//res.cookie('password', req.body.password, { path: '/index', signed: true });

			  }
			}
			if(bool){
				console.log("Your username does not exist!");
				res.render('index');
			}
		});
		
	}
	

});
/*
//執行註冊
router.post =('/register', function(req, res){
	console.log('testttt');
	if(req.body.password != req.body.password2){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body.password);
		console.log('第二次輸入的密碼：' + req.body.password2);
		return res.redirect('/register');
	}
	else{
		// Set our internal DB variable
		var db = req.db;
		// Get our form values. These rely on the "name" attributes
		var userName = req.body.username;
		console.log(userName);
		var passWord = req.body.password;
		console.log(passWord);
		// Set our collection
		var collection = db.get('usercollection');
		// Submit to the DB
		collection.insert({
			"username" : userName,
			"password" : passWord
		}, function (err, doc) {
			if (err) {
				// If it failed, return error
				res.send("There was a problem adding the information to the database.");
			}
			else {
				// If it worked, set the header so the address bar doesn't still say /adduser
				res.location("userlist");
				// And forward to success page
				res.redirect("userlist");
			}
		});
		res.cookie('userid', req.body.username, { path: '/', signed: true});		
		res.cookie('password', req.body.password, { path: '/', signed: true });
		return res.redirect('/');
	}
});*/

//檢查使用者登入狀態
var isLogin = false;
var checkLoginStatus = function(req, res){
	isLogin = false;
	if(req.signedCookies.username && req.signedCookies.password){
		isLogin = true;
	}
};
//註冊頁面
exports.reg = function(req, res){
	checkLoginStatus(req, res);
	res.render( 'register', {
		title : '註冊',
		loginStatus : isLogin
	});
};

module.exports = router;

