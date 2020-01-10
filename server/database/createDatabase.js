var async = require('async');
var couch = require('./connection');
var views = require('./views')
var databases = ['incidents', 'users', 'roles', 'permissions', 'incidentstatus'];

module.exports = initDatabase;

function initDatabase(cb) {
  createDatabases(cb);
  createViews(cb);
  // async.series([createDatabases, createViews], cb);
}

function createDatabases(cb) {
  async.each(databases, createDatabase, cb);
}

function createDatabase(db, cb) {
  couch.db.create(db, function (err) {
    if (err && err.statusCode == 412) {
      err = null;
    }
    cb(err);
  });
}

function createViews(cb) {
  views.populate(cb);
}