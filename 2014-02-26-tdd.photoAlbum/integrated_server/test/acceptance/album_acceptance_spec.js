'use strict';

process.env.DNAME='album-test';
//var expect = require('chai').expect;
var request = require('supertest');
var fs = require('fs');
var rimraf = require('rimraf');
var app = require('../../app/app');
var Album;

describe('albums', function(){

  beforeEach(function(done){
    rimraf.sync(__dirname + '/../../app/static/img');
    fs.mkdirSync(__dirname + '/../../app/static/img');
    var origfile = __dirname + '/../fixtures/dungeon-cover.jpg';
    var copyfile = __dirname + '/../fixtures/dungeon-cover-copy.jpg';
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
    global.nss.db.dropDatabase(function(err, result){done();});
  });

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      Album = require('../../app/models/album');
      done();
    });
  });
    
  describe('GET /albums', function(){
    it('should display the new album html page', function(done){
      request(app)
      .get('/albums/new')
      .expect(200, done);
    });
  });


  describe('POST /albums', function(){
    it('creates a new album and sens user to home page', function(done){
      var filename = __dirname + '/../fixtures/dungeon-cover-copy.jpg';
      debugger;

      request(app)
      .post('/albums')
      .attach('cover', filename)
      .field('title', 'My Lil Dungeon')
      .field('taken', '2014-06-15')
      .expect(302, done);
    });
  });

////END OF DESCRIBE////
});
