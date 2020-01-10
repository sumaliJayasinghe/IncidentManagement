var initCouch = require('../database/createDatabase'); var api = require('./api')
var express = require('express')
const app = express();
var bodyParser = require('body-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
initCouch(function (err, res) {
    if (err) {
        throw err
    }
    else {
        console.log(res)
        console.log('couchdb initialized');
    }
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(8000);
app.use('/api/v1', api);

module.exports = app; // for testing