/**
 * Create couchDB database connection
 * Each requests opens a new http connection.
 */
// var config = require("config")
var nano = require('nano');
module.exports = nano(process.env.COUCHDB_URL || "http://127.0.0.1:5984");