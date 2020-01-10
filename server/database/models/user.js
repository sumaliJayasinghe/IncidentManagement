var userDB = require('../connection').use('users');
var schemas = require('../schemas');
var errors = require('../errors');
var diff = require('object-versions').diff;

module.exports = {
    create: schemas.validating('user', 'create', createUser),
    update: updateUser,
    delete: deleteUser,
    getUsersByRole: getUsersByRole,
    getUsersById: getUsersById
}

function createUser(user, cb) {
    user.createdDate = new Date().toISOString();
    user.updatedDate = new Date().toISOString();
    userDB.insert(user, errors.wrapNano(cb));
};

function updateUser(user, cb) {
    user.lastLoggedInDate = new Date().toISOString();
    user.updatedDate = new Date().toISOString();
    userDB.get(user._id, errors.wrapNano(function (err, currentUser) {
        if (err) {
            cb(err);
        } else {
            var userDiff = diff(currentUser, user)
            schemas.validate(userDiff, 'user', 'update', function (err) {
                if (err) {
                    cb(err)
                } else {
                    userDB.insert(user, errors.wrapNano(cb));
                }
            })
        }
    }))
};

function deleteUser(id, rev, cb) {
    userDB.destroy(id, rev, errors.wrapNano(cb));
};

function getUsersByRole(id, cb) {
    userDB.view('by_asignee', 'by_asignee', { keys: [id], include_docs: true },
        errors.wrapNano(function (err, result) {
            if (err) {
                cb(err);
            } else {
                var res = {
                    dataList: []
                }
                result.rows.forEach(row => {
                    res.dataList.push(row.doc)
                });
                cb(null, res);
            }
        }));
};

function getUsersById(id, cb) {
    userDB.view('by_id', 'by_id', { 'key': id, 'include_docs': true },
        errors.wrapNano(function (err, result) {
            if (err) {
                cb(err);
            } else {
                var res = {
                    data: result.rows[0].doc
                }
                cb(null, res);
            }
        }));
};
