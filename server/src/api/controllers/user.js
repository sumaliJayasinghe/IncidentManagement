var users = require('../../../database/models/user');
var util = require('../../utility/util')
var jwt = require('jsonwebtoken');

var authenticate = (req, res) => {

    if (!req.body.username || !req.body.password) {
        // return 401 error is username or password doesn't exist, or if password does
        // not match the password in our records
        return res.status(401).end()
    }

    const user = users.getUsersById(req.body.username, (err, result) => {
        let data = result.data;

        if (data && data._id) {

            const token = jwt.sign({ sub: data.userId, role: data.role.code }, global.gConfig.jwtKey, {
                algorithm: 'HS256',
                expiresIn: global.gConfig.jwtExpirySeconds
            });

            users.update(data, (err, data) => {
                if (err) {
                    throw err;
                }


                res.cookie('token', token, { maxAge: global.gConfig.jwtExpirySeconds * 1000 });

                res.send(util.structureResponse(200, result.data));
            });

        }
    });

}
var createUser = (req, res) => {
    req.body.createdDate = new Date().getTime();
    users.create(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

var getUsersByRole = (req, res) => {
    users.getUsersByRole(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

var updateUser = (req, res) => {
    users.update(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    });
}

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