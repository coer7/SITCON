var express = require('express');
var router = express.Router();
var bool=false;
var username,password,now_price;
/* GET home page. */
router.get('/', function(req, res, next) {
  	used = bool ? true : false;
	
  	res.render('index', { title: 'Express' ,"signed": used,"posts":postList,"add":addList});
});

router.get('/index', function(req, res, next) {
	used = bool ? true : false;
	
  	res.render('index', { title: 'Express' ,"signed": used,"posts":postList,"add":addList});

	
});


router.post('/logout', function(req, res) {
	
	bool = false;
	used = false;
  	res.render('index', { title: 'Express' ,"signed": used,"add":addList,"posts":postList});
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express register',"signed":!!req.body.username });
});
router.get('/login', function(req, res, next) {

	used = bool ? true : false
  	res.render('login', { title: 'Express' ,"signed": used});

});

router.get('/personal_page', function(req, res, next) {

	used = bool ? true : false;
	
  	res.render('personal_page', { title: 'Express' ,"signed":used ,"username":username,"password":password,"price":now_price});
});
// router.get('/personal_page_', function(req, res, next) {
//   res.render('personal_page_', {"username":req.body.username,"password":req.body.password});
// });
//var login=false;
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
router.post('/price',function(req,res){

	var price = req.body.price;

	var db = req.db;
	var collection = db.collection('usercollection');

	now_price = now_price - price;
	
	collection.update({"username":username},{


      $set: { "coin": now_price},
      $currentDate: { "lastModified": true }
    
	},function(err,docs){
			if(err){
				console.log("no update");
			}else{

			
			var objKey = Object.keys(docs);
  			used = bool ? true : false;

			
				
			console.log("Hello! " + username);
			console.log("Your price is "+price)

				 
			res.render('personal_page',{
					"signed": used,"username":req.body.username,"password":req.body.password,"price": now_price });
			  
			 }
			
		});
	// collection.find({},{},function(e,docs){
	// 		var objKey = Object.keys(docs);
 //  			used = bool ? true : false;

	// 		for( var i=0;i<objKey.length;i++){
	// 		  if(username == docs[i].username){
				
	// 			console.log("Hello! " + username);
	// 			console.log("Your price is "+price)

				 
	// 			now_price = docs[i].coin - price;
	// 			res.render('personal_page',{
	// 				"signed": used,"username":req.body.username,"password":req.body.password,"price": now_price });
	// 		  }else{
	// 		  	console.log("Sure? Not Found Your Name");
	// 		  }
	// 		}
			
	// 	});

});


router.post('/register', function(req, res) {
	console.log('testttt');
	if(req.body.password != req.body.password2){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body.password);
		console.log('第二次輸入的密碼：' + req.body.password2);
		return res.redirect('/register');
	}else{
		console.log("Enter!");
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
			"password" : passWord,
			"coin":100
		}, function (err, doc) {
			if (err) {
				// If it failed, return error
				res.send("There was a problem adding the information to the database.");
			}
			else {
				// If it worked, set the header so the address bar doesn't still say /adduser
				username = userName;
				password = passWord;
				now_price=100;
				bool=true;
				res.location("personal_page");
				// And forward to success page

				// res.redirect("personal_page");
				res.render('personal_page',{
					"signed": req.body.username,"username":req.body.username,"password":req.body.password,"price": now_price });
			}
		});
			
	}
	
});



var anUser="String";
router.post('/login', function(req, res) {
	if(req.body.password != req.body.password2){
		console.log('密碼輸入不一致。');
		console.log('第一次輸入的密碼：' + req.body.password);
		console.log('第二次輸入的密碼：' + req.body.password2);
		return res.redirect('/login');
	}else{
		console.log("123");
		
		var db = req.db;
		var collection = db.collection('usercollection');
		var userName = req.body.username;
		anUser=userName;
		//console.log(userName==anUser);
		
		var flag=true;
		//console.log("userName= "+userName);
		now_price = req.body.coin;

		var passWord = req.body.password;
		//console.log("passWord= "+passWord);
		collection.find({},{},function(e,docs){
			var objKey = Object.keys(docs);
			for( var i=0;i<objKey.length;i++){
			  if(userName == docs[i].username){
				flag=false;
				console.log("Hello! " + userName);
				console.log("Your password is "+passWord)
				console.log("Hello! " + docs[i].coin);

				bool = true;
				username= userName;
				password = passWord ;
				now_price = docs[i].coin;
				res.render('personal_page',{
					"signed": req.body.username,"username":req.body.username,"password":req.body.password ,"price":docs[i].coin});
			  }
			}
			if(flag){
				console.log("Your username does not exist!");
				res.render('login',{
					"signed":false});

			}
		});
		
	}
	

});
var postList = [
	{ id: 1, name: "Apple", msg: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the gre‬" },
	{ id: 2, name: "Zoe", msg: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymph. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta." },
	{ id: 3, name: "Cathy", msg: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu" }
]; 
var count = postList.length;
console.log(count);

var addList=[
	{'post': "橘子",'des': "橘子假期" ,'start': '2016/8/02','end': '2016/8/05' ,'price': 1000},
	{'post': "橘子",'des': "橘子假期" ,'start': '2016/8/02','end': '2016/8/05' ,'price': 1000},
	{'post': "橘子",'des': "橘子假期" ,'start': '2016/8/02','end': '2016/8/05' ,'price': 1000}
];
router.post('/add',function(req,res){
	console.log("Add new");
	console.log(req.body.end);
	used = bool ? true : false;

	var element = {'post': req.body.post,'des': req.body.des ,'start': req.body.start,'end': req.body.end ,'price': req.body.price};
    addList.push(element);
	res.render('index', { title: 'Express' ,"signed": used,"add":addList,"posts":postList});
});

//發表訊息
router.post('/post', function(req, res) {
console.log("Post");
	var element = { id: (count+=1), name: anUser, msg: req.body.post };
	postList.push(element);

	used = bool ? true : false;

	console.log(postList);
		res.render('index', { title: 'Express' ,"signed": used,"posts":postList,"add":addList});



});
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

