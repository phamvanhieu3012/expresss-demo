var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

var userRoute = require('./routes/user.route');
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req,res){
	res.render('index',{
		name: 'AAA'
	});
});

app.use('/users', userRoute);

app.listen(port, function(){
	console.log('Server listening on port' + port);
});