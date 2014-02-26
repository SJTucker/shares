'use strict';

process.env.DNAME='album-test';
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var Album;

describe('Album', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Album = require('../../app/models/album');
      done();
    });
  });

  beforeEach(function(){
    rimraf.sync(__dirname + '/../../app/static/img');
    fs.mkdirSync(__dirname + '/../../app/static/img');
    var origfile = __dirname + '/../fixtures/dungeon-cover.jpg';
    var copyfile = __dirname + '/../fixtures/dungeon-cover-copy.jpg';
    fs.createReadStream(origfile).pipe(fs.createWriteStream(copyfile));
  });

  describe('new', function(){
    it('should create a new instance of Album', function(){
      var a1 = new Album({title: 'My Lil Dungeon',
                          taken: '03/08/2003',
                          });

      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('My Lil Dungeon');
      expect(a1.taken).to.be.instanceof(Date);
      expect(a1.taken).to.deep.equal(new Date('03/08/2003'));
    });
  });
  
  describe('#addCover', function(){
    it('should create a new instance of Album', function(){
      var a1 = new Album({title: 'My Lil Dungeon',
                          taken: '03/08/2003',
                          });
      var oldPath = __dirname + '/../fixtures/dungeon-cover.jpg';
      a1.addCover(oldPath);
      
      expect(a1).to.be.instanceof(Album);
      expect(a1.title).to.equal('My Lil Dungeon');
      expect(a1.taken).to.be.instanceof(Date);
      expect(a1.taken).to.deep.equal(new Date('03/08/2003'));
      expect(a1.cover).to.equal(path.normalize(__dirname + '/../../app/static/img/mylildungeon/cover.jpg'));
    });
  });

// End Describe //
});
