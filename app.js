console.log('\n =============== \n');
/**
 * Module dependencies.
 */

var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var reload = require('reload');
var ejs  = require('ejs');

var http = require('http');
var path = require('path');
var app = express();
var helpers = require('express-helpers');
var createServer, currentEnvironment;

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

currentEnvironment = app.get('env');

// development only
if (currentEnvironment == 'development') {
  app.use(express.errorHandler());
}

// render scripts
app.locals({
    scripts: [],
  renderScriptsTags: function (all) {
    app.locals.scripts = [];
    if (all != undefined) {
      return all.map(function(script) {
        return '<script src="/javascripts/' + script + '"></script>';
      }).join('\n ');
    }
    else {
      return '';
    }
  },
  getScripts: function(req, res) {
    return scripts;
  }
});

// views
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/poll/:id', routes.poll);
app.get('/create/:id', routes.create);

createServer = http.createServer(app);

reload(createServer, app);

createServer.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});