var express  = require('express');  
var http  = require('http'); 
var app      = express();
GLOBAL.mongojs = require('mongojs');
//GLOBAL.db = mongojs('mongodb://csr:root@ds063307.mongolab.com:63307/xammagik',['userstests','examslisttests','questionstests','answertests' ]);
GLOBAL.db = mongojs('mongodb://chetan10:chetan10@ds045099.mongolab.com:45099/testrun',['users','projects','accounts']);
app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
}); 
Date.prototype.getFullDate = function( date ){
	var mnth = ( date.getMonth()+1 ) < 10 ? "0"+(date.getMonth()+1) :( date.getMonth()+1 );
	var dates = ( date.getDate() ) < 10 ? "0"+(date.getDate()) :( date.getDate() );
    return [date.getFullYear(),mnth, dates ].join('/');
};
var server = http.createServer(app).listen(process.env.PORT ||3000);
console.log("App listening on port"+server.address().port);

app.get('/#', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/adminreg', function(req, res) {
	res.sendfile('./public/adminreg.html'); 
});
/*app.use(express.basicAuth(function(user, pass) {
	return user === 'root' && pass === 'root';
}));*/

//Bootstrap routes
require('./routes/restRouter')(app);

