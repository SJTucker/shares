'use strict';

var Album = require('../models/album');

exports.index = function(req, res){
  res.render('albums/new/index', {title: 'Albums'});
};

exports.create = function(req, res){
  debugger;
  var album = new Album(req.body);
  console.log(req.files.cover);
  album.addCover(req.files.cover.path);
  album.insert(function(){
    res.redirect('/');
  });
};
