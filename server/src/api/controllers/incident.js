var incidents = require('../../database/models/incident');
var util = require('../../utility/util');
const Boom = require('boom');

/**
 * /incidents/getIncidents
 * get all incidents from database
 * @param {object} req request
 * @param {object} res response
 */
var getAllIncidents = (req, res, next) => {
    incidents.getAll((err, data) => {
        if (err) {
            var err = Boom.badImplementation('An internal server error occurred');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    })
}

var getIncidents = (req, res, next) => {
    incidents.getIncidents(req.body, (err, data) => {
        if (err) {
            var err = Boom.badImplementation('An internal server error occurred');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    })
}

/**
 * /incidents/createIncident
 * create incident
 * @param {object} req request
 * @param {object} res response
 */
var createIncident = (req, res, next) => {
    // set unique incident ID
    req.body.incidentId = "IN_" + util.generateId();
    req.body.status = {
        code: "NEW",
        description: "New"
    }

    incidents.create(req.body, (err, data) => {
        if (err) {
            var err = Boom.badImplementation('An internal server error occurred');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    });
}

/**
 * /incidents/getIncidentByAsigneeId
 * get incident by assignee userId
 * @param {object} req request
 * @param {object} res response
 */
var getIncidentByAsigneeId = (req, res, next) => {
    incidents.getIncidentByAssignee(req.body, (err, data) => {
        if (err) {
            var err = Boom.badImplementation('An internal server error occurred');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    })
}

/**
 * /incidents/getIncidentsById
 * get incident by incidentId
 * @param {object} req request
 * @param {object} res response
 */
var getIncidentsById = (req, res, next) => {
    incidents.getById(req.body, (err, data) => {
        if (err) {
            var err = Boom.badImplementation('Retrieve incident is fail');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    })
}

/**
 * /incidents/getIncidentByCreatorId
 * get incident by creator userId
 * @param {object} req request 
 * { creatorId:"",
 *   limit:0,
 *   page:0
 * }
 * @param {object} res response
 */
var getIncidentsByCreatorId = (req, res, next) => {
    incidents.getIncidentByCreator(req.body, (err, data) => {
        if (err) {
            var err = Boom.badImplementation('An internal server error occurred');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    })
}

/**
 * /incidents/updateIncident
 * update incident
 * @param {object} req request
 * @param {object} res response
 */
var updateIncident = (req, res, next) => {
    incidents.update(req.body, (err, data) => {
        if (err) {
            var err = Boom.badImplementation('An internal server error occurred');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    })
}

/**
 * /incidents/deleteIncident
 * delete incident
 * @param {object} req request
 * @param {object} res response
 */
var deleteIncident = (req, res, next) => {
    incidents.delete(req.body._id, req.body._rev, (err, data) => {
        if (err) {
            var err = Boom.badImplementation('An internal server error occurred');
            return next(err);
        }
        res.send(util.structureResponse(200, data));
    })
}


module.exports = {
    getIncidents: getIncidents,
    getAllIncidents: getAllIncidents,
    createIncident: createIncident,
    getIncidentsById: getIncidentsById,
    getIncidentByAsigneeId: getIncidentByAsigneeId,
    updateIncident: updateIncident,
    getIncidentsByCreatorId: getIncidentsByCreatorId,
    deleteIncident: deleteIncident
}