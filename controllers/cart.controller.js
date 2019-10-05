var db = require('../db');

module.exports.addToCart = function(req,res,next){
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/products');
		return;
	}

	var count = db
		.get('sessions')
		.find({id: sessionId})
		.get('cart.' + productId, 0) // tra ve undefined neu k tim thay
		.value();

	db.get('sessions')
	.find({id: sessionId})
	.set('cart.' + productId, count+1)
	.write();

	console.log(db.get("sessions").find({ id: sessionId }).get("cart").size().value());

	res.redirect('/products');
};