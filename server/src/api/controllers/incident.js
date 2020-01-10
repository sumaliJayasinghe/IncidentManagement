var incidents = require('../../../database/models/incident');
var util = require('../../utility/util')

/**
 * /incidents/getIncidents
 * get all incidents from database
 * @param {object} req request
 * @param {object} res response
 */
var getIncidents = (req, res) => {
    incidents.getAll((err, data) => {
        if (err) {
            throw err;
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
var createIncident = (req, res) => {
    // set unique incident ID
    req.body.incidentId = "IN_" + util.generateId();

    incidents.create(req.body, (err, data) => {
        if (err) {
            throw err;
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
var getIncidentByAsigneeId = (req, res) => {
    incidents.getIncidentByAssignee(req.body.asigneeId).then((data) => {
        res.send(util.structureResponse(200, data));
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
}

/**
 * /incidents/getIncidentsById
 * get incident by incidentId
 * @param {object} req request
 * @param {object} res response
 */
var getIncidentsById = (req, res) => {
    incidents.getById(req.body.incidentId, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    })
}

/**
 * /incidents/getIncidentByCreatorId
 * get incident by creator userId
 * @param {object} req request
 * @param {object} res response
 */
var getIncidentByCreatorId = (req, res) => {
    incidents.getIncidentByCreator(req.body.creatorId, (err, data) => {
        if (err) {
            throw err;
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
var updateIncident = (req, res) => {
    incidents.update(req.body, (err, data) => {
        if (err) {
            throw err;
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
var deleteIncident = (req, res) => {
    incidents.delete(req.body._id, req.body._rev, (err, data) => {
        if (err) {
            throw err;
        }
        res.send(util.structureResponse(200, data));
    })
}


module.exports = {
    getIncidents: getIncidents,
    createIncident: createIncident,
    getIncidentsById: getIncidentsById,
    getIncidentByAsigneeId: getIncidentByAsigneeId,
    updateIncident: updateIncident,
    getIncidentByCreatorId: getIncidentByCreatorId,
    deleteIncident: deleteIncident
}