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
/* POST to Add User Service */
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
});
router.post('/login', function(req, res) {
	console.log("You are in!");
	var db = req.db;
	var collection = db.collection('usercollection');
	var userName = req.body.username;
	console.log("userName= "+userName);
	var passWord = req.body.password;
	console.log("passWord= "+passWord);
    collection.find({},{},function(e,docs){
		var objKey = Object.keys(docs);
		console.log("objKey= "+objKey);
		console.log("doc= "+JSON.stringify(docs[0]));

		objKey.forEach(function(objectid){
			console.log("test");
			var items = Object.keys(docs[objectid]);
			items.forEach(function(itemkey) {
			  var itemvalue =docs[objectid][itemkey];
			  console.log("ID="+objectid+': '+itemkey+' = '+itemvalue);
			})
		})

    for( var i=0;i<objKey.length;i++){
      

      if(userName == JSON.stringify(docs[i].username)){
        console.log("Hello! " + userName);
        console.log("Your password is "+passWord)
      }else{
        console.log("Your username is not exist!");
      }

    }
	
		
	});

	
});

module.exports = router;

