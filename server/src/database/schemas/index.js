var schemaNames = ['incident', 'user'];
var schemas = {};
var Joi = require('joi');

schemaNames.forEach(function (schemaName) {
    schemas[schemaName] = require('./' + schemaName + '-schema');
});

module.exports = {
    validate: validate,
    validating: validating
}

function validate(doc, schema, op, cb) {
    if (typeof schema == 'string') {
        schema = schemas[schema];
    }
    if (!schema) {
        cb(new Error('Unknown schema'));
    } else {
        schema = schema[op];
        if (!schema) {
            cb(new Error('Unknown schema'));
        } else {
            Joi.validate(doc, schema, function (err, value) {
                if (err) {
                    Boom.wrap(err, 400);
                    cb(err);
                } else {
                    cb(null, doc);
                }
            });
        }
    }
};

function validating(schemaName, op, fn) {
    var schema = schemas[schemaName];
    if (!schema) {
        throw new Error('Unknown schema: ' + schemaName);
    }
    return function (doc, cb) {
        validate(doc, schema, op, function (err, doc) {
            if (err) {
                cb(err);
            }
            else {
                fn.call(null, doc, cb);
            }
        });
    };
};

