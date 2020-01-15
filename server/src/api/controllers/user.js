const users = require('../../database/models/user');
const util = require('../../utility/util')
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
const Boom = require('boom');
const fs = require('fs');
var path = require('path');
/**
 * /user/getUserBySession
 * Authenticate user 
 * @param {object} req request
 * @param {object} res response
 */
var authenticate = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        // return 401 error is username or password doesn't exist, or if password does
        // not match the password in our records
        return res.status(401).end()
    }

    let depassword = CryptoJS.AES.decrypt(req.body.password.toString(), global.gConfig.pwdEncryptKey);
    var decryptedData = depassword.toString(CryptoJS.enc.Utf8);

    users.getUsersById(req.body.username, (err, result) => {
        console.log("result");
        console.log(result);
        let data = (result && result != undefined) ? result.data : null;

        console.log(data);
        // PRIVATE key
        var privateKEY = fs.readFileSync(path.resolve('accessKey/private.key'), 'utf8');

        if (!data || (data && !data.password)) {
            var err = Boom.unauthorized('User not found');
            return next(err);
        } else {

            let dbpassword = CryptoJS.AES.decrypt(data.password, global.gConfig.pwdEncryptKey);
            let dbpwd = dbpassword.toString(CryptoJS.enc.Utf8);

            if (data && data != "" && data._id && decryptedData == dbpwd) {
                // generate web token
                const token = jwt.sign({ sub: data.userId, role: data.role.code }, privateKEY, {
                    algorithm: 'RS256',
                    expiresIn: global.gConfig.jwtExpirySeconds
                });
                // update user in databse
                users.update(data, (err, data) => {
                    if (err) {
                        throw err;
                    }

                    res.cookie('token', token, {
                        maxAge: global.gConfig.jwtExpirySeconds * 1000,
                        secure: false, // set to true if your using https
                        httpOnly: true,
                        withCredentials: true
                    })
                    // res.cookie('token', token, { maxAge: global.gConfig.jwtExpirySeconds * 1000 });
                    delete result.data.password;
                    res.send(util.structureResponse(200, result.data));

                }, (e) => {
                    var err = Boom.unauthorized('login failed');
                    return next(err);
                });

            } else {
                console.log("error ----- ")
                var err = Boom.unauthorized('invalid password');
                return next(err);
            }
        }


    }, (e) => {
        var err = Boom.unauthorized('user not found');
        return next(err);
    })
}

/**
 * /user/createUser
 * Create user 
 * @param {object} req request
 * @param {object} res response
 */
var createUser = (req, res, next) => {
    req.body.createdDate = new Date().getTime();
    users.create(req.body, (err, data) => {
        if (err) {
            var err = Boom.unauthorized('user not found');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    });
}

/**
 * /user/listUsersByRole
 * Get user by role 
 * @param {object} req request
 * @param {object} res response
 */
var getUsersByRole = (req, res) => {
    users.getUsersByRole(req.body.roleId, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

/**
 * /user/updateUser
 * Update user
 * @param {object} req request
 * @param {object} res response
 */
var updateUser = (req, res) => {
    users.update(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

/**
 * /user/deleteUser
 * Delete user by id 
 * @param {object} req request
 * @param {object} res response
 */
var deleteUser = (req, res) => {
    users.delete(req.body._id, req.body._rev, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}


module.exports = {
    getUsersByRole: getUsersByRole,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    authenticate: authenticate
}