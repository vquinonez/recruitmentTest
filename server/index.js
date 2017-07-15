var express = require('express'), 
	app = module.exports.app = exports.app = express();
 
app.get('/', function(req, res){
  res.send('service is up!');
});

app.get('/users/', function(req, res){
  res.send('users Service');
});
 
app.listen(process.env.port);