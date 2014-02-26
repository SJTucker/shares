'use strict';

module.exports = Album;

//var albums = global.nss.db.collection('albums');
//var Mongo = require('mongodb');
var fs = require('fs');
var path = require('path');

function Album(album){
  this._id = album._id;
  this.title = album.title;
  this.taken = new Date(album.taken);
  this.cover = '';
  this.photos = [];
}

Album.prototype.addCover = function(oldPath){
  var dirname = this.title.replace(/\s/g, '').toLowerCase();
  var newPath = __dirname + '/../static/img/' + dirname;
  fs.mkdirSync(newPath);

  var extension = path.extname(oldPath);
  newPath += '/cover' + extension;
  fs.renameSync(oldPath, newPath);

  this.cover = path.normalize(newPath);
  

};
