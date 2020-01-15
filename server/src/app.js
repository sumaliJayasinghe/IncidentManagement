var initCouch = require('./database/createDatabase'); var api = require('./api')
var express = require('express')
const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');
const config = require('../config/config.js');
var errorhandler = require('../src/common/errorHandler');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => {
    res.json(global.gConfig);
});

initCouch(function (err, res) {
    console.log('couchdb initialized');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', api);
app.use(errorhandler);

app.listen(global.gConfig.node_port, () => console.log(`App listening on port ${global.gConfig.node_port}!`));
module.exports = app; // for testing