var async = require('async');
var equal = require('deep-equal');
var couch = require('../connection');

var databaseNames = ['incidents', 'users']

var views = {};

databaseNames.forEach(db => {
    views[db] = require('./' + db)
});

function populateDB(dbName, cb) {
    var db = couch.use(dbName);
    var dbViews = views[dbName];

    var insertDbDoc = (ddoc, viewName, cb) => {
        var view = dbViews[viewName];
        var dbDocName = '_design/' + viewName;
        if (!ddoc) {
            ddoc = {
                language: 'javascript',
                views: {}
            }
        }

        ddoc.views[viewName] = view;

        db.insert(ddoc, dbDocName, (err) => {
            if (err && err.statusCode == 409) {
                ensureView(viewName, cb);
            } else {
                // cb(err);
                console.log(err)
                cb(err);
            }
        });
    }

    var ensureView = (viewName, cb) => {
        var view = dbViews[viewName];
        var dbDocName = '_design/' + viewName;
        db.get(dbDocName, (err, ddoc) => {
            if (err && err.statusCode == 404) {
                insertDbDoc(null, viewName, db)
            } else if (err) {
                console.log(err)
                cb(err);
            } else if (equal(ddoc.views[viewName], view)) {
                cb()
            } else {
                insertDbDoc(ddoc, viewName, cb)
            }

        })
    }

    async.eachSeries(Object.keys(dbViews), ensureView, cb);

}

exports.populate = function populate(cb) {
    async.each(databaseNames, populateDB, cb)
}