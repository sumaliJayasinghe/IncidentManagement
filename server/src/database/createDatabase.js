var async = require('async');
var couch = require('./connection');
var views = require('./views')
var databases = ['incidents', 'users', 'roles', 'permissions', 'incidentstatus'];
const shell = require('shelljs')

module.exports = initDatabase;

// Initialize database
function initDatabase(cb) {
  async.series([createDatabases, createViews], cb);
}

// create all databases
function createDatabases(cb) {
  async.each(databases, createDatabase, cb);
}

function createDatabase(db, cb) {
  couch.db.get(db).then((body) => {
    console.log(db + " database exists");
  }, err => {
    couch.db.create(db, function (err, data) {
      console.log("creating database: " + db);
      if (err) {
        if (err.statusCode == 412) {
          err = null;
        }
        cb(err)
      } else {
        cb(data);
      }
      if (db == 'users') {
        shell.exec('./scripts.sh')
      }
    });
  })
  // nano.db.destroy(db).then((response) => {
  //   couch.db.create(db, function (err, data) {
  //     if (err) {
  //       if (err.statusCode == 412) {
  //         err = null;
  //       }
  //       cb(err)
  //     } else {
  //       cb(data);
  //     }
  //   });
  // });
}

// create views
function createViews(cb) {
  views.populate(cb);
}