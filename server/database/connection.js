/**
 * Create couchDB database connection
 * Each requests opens a new http connection.
 */
// var config = require("config")
var nano = require('nano');
module.exports = nano(process.env.COUCHDB_URL || "http://localhost:8091");