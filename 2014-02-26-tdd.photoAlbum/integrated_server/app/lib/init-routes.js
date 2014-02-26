'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  //var home = require('../routes/home');
  var album = require('../routes/album');

  app.get('/albums/new', d, album.index);
  app.post('/albums', d, album.create);
  console.log('Routes Loaded');
  fn();
}

