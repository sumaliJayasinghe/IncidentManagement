/**
 * Create couchDB database connection
 * Each requests opens a new http connection.
 */

var nano = require('nano');
console.log(process.env.COUCHDB_URL);
module.exports = nano(process.env.COUCHDB_URL || "http://localhost:5984");