//var db = require('../db');
var User = require('../models/user.model');
var md5 = require('md5');

module.exports.login = function(req,res){
	res.render('auth/login');
};

module.exports.postLogin = async function(req,res){
	var email = req.body.email;
	var password = req.body.password;

	var users = await User.find();
	var user = User.find({ email: email},function(err, obj) {                  
        return obj;
    });

	if(!user){
		res.render('auth/login',{
			errors: [
				'Users does not exits.'
			],
			values: req.body
		});
		return;
	}

	var haskPassword =  md5(password);

	if(user[0].password !== haskPassword){ //kiem tra mat khau cua user co trung voi doan hask k
		res.render('auth/login',{
			errors: [
				'Wrong password.'
			],
			values: req.body
		});
		return;
	}

	res.cookie('userId', user[0].id,{
		signed: true
	});
	res.redirect('/users');
};