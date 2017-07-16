var express = require('express'), 
	app = module.exports.app = exports.app = express();
var path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
app.get('/', function(req, res){
  res.send('service is up!');
});

app.get('/users/', function(req, res){
  	res.sendFile(path.normalize(__dirname + '/data/users.json'))
});
app.get('/activities/', function(req, res){
  	res.sendFile(path.normalize(__dirname + '/data/activities.json'))
});
 
app.listen(process.env.port);