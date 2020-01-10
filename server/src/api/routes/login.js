const express = require('express')
const loginRouter = express.Router();
const loginCon = require('../controllers/user')

loginRouter.post('/login', loginCon.createUser);
loginRouter.post('/logout', loginCon.createUser);

module.exports = loginRouter;

