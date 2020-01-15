var Joi = require('joi');
var extend = require('util')._extend;

module.exports = {
    create: Joi.object().keys(createUserAttributes),
    update: Joi.object().keys(updateUserAttributes)
}
var updateUserAttributes = {
    _rev: Joi.string(),
    _id: Joi.string(),
    userId: Joi.string().max(9).required(),
    fullName: Joi.string().max(60).required(),
    email: Joi.string().email().required(),
    createdDate: Joi.string().max(70),
    updatedDate: new Date().getTime(),
    status: Joi.object().keys({
        code: Joi.string().max(10).required(),
        description: Joi.string().max(10).required()
    }),
    role: Joi.object().keys({
        code: Joi.string(),
        roleName: Joi.string(),
        permissions: Joi.array().items(Joi.object().keys({
            code: Joi.string().max(70),
            description: Joi.string().max(70)
        }))
    }),
    password: Joi.string().max(60).required(),
    passwordExpiryDate: Joi.string().max(60).required(),
    lastLoggedInDate: Joi.string().max(70)
}

var createUserAttributes = extend({
    userId: Joi.string().max(9).required(),
    createdDate: Joi.string().max(70)
}, updateUserAttributes);