var express = require('express');
var incidentRouter = require('./routes/incidents');
var userRouter = require('./routes/users')

const api = express()

api.use('/incidents', incidentRouter);
api.use('/user', userRouter);
module.exports = api