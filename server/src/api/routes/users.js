const express = require('express')
const userRouter = express.Router();
const userCon = require('../controllers/user')

userRouter.post('/getUserBySession', userCon.createUser);
userRouter.post('/createUser', userCon.createUser);
userRouter.post('/listUsersByRole', userCon.getUsersByRole);
userRouter.post('/updateUser', userCon.updateUser);
userRouter.post('/deleteUser', userCon.deleteUser);
userRouter.post('/loginUser', userCon.authenticate);
module.exports = userRouter;

