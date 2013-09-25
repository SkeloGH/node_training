
/**
 * Module dependencies.
 */

var express = require('express');
var helpers = require('express-helpers');
var routes = require('./routes');
var reload = require('reload');
var ejs  = require('ejs');

var user = require('./routes/user');
var http = require('http');
var path = require('path');
var app = express();
var createServer;

// enable helpers
helpers(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/about', routes.about);

createServer = http.createServer(app);

reload(createServer, app);

createServer.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});