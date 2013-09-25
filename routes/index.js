var getParamNames = function(params){
  var paramNames = [],
    counter = 0;
  for(var keys in params){
    paramNames[counter] = keys;
    counter++;
  }
  return paramNames;
};
var fillOptions = function(params){
  var options = [],
    paramNames = getParamNames(params),
    paramsLength = paramNames.length,
    optionValuePrefix = Math.abs(Math.random().toString().indexOf(1));
  
  for (var i = 0; i < paramsLength; i ++) {
    options[i] = {
      value: paramNames[i],
      text: params[paramNames[i]],
      class: optionValuePrefix
    };
  }
  if (!options.length) {
    options = [{
      value:'default',
      text:'default',
      class: optionValuePrefix
    }];
  }
  return options;
};

/*
  GET home page.
*/
exports.index = function(req, res){
  options = fillOptions(req.query);
  res.render('index', { title: 'Express', options: options });
};
exports.poll = function(req, res){
  var userName = req.params.id;
  options = fillOptions(req.query);
  res.render('poll', { userName: userName, options: options });
};
exports.create = function(req, res){
  var options = req.query.u? req.query : {u:''};
  res.render('create', options);
};
