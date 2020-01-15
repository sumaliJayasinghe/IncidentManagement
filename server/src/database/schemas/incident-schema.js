var Joi = require('joi');
var extend = require('util')._extend;

module.exports = {
    create: Joi.object().keys(createAttributes),
    update: Joi.object().keys(updateAttributes)
}

var updateAttributes = {
    _rev: Joi.string(),
    _id: Joi.string(),
    incidentId: Joi.string().max(9).required(),
    category: Joi.string().max(30).required(),
    title: Joi.string().max(100).required(),
    description: Joi.string().max(500).required(),
    priority: Joi.string().max(10).required(),
    assignee: Joi.object().keys({
        fullname: Joi.string().max(70).required(),
        userId: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required().required()
    }),
    updatedDate: Joi.string().max(70),
    updatedBy: Joi.object().keys({
        fullname: Joi.string().max(70),
        userId: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required()
    }),
    status: Joi.object().keys({
        code: Joi.string().max(10).required(),
        description: Joi.string().max(10).required()
    })
};

var createAttributes = extend({
    createdBy: Joi.object().keys({
        fullname: Joi.string().max(70).required(),
        userId: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required().required()
    }),
    createdDate: Joi.string().max(70)
}, updateAttributes);