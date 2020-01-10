var incidents = require('../../../database/models/incident');

/**
 * /incidents/getIncidents
 * get all incidents from database
 * @param {object} req request
 */
var getIncidents = () => {
    return incidents.getAll();

}

/**
 * /incidents/createIncident
 * create incident
 * @param {object} req request
 */
var createIncident = (req) => {
    return incidents.create(req, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

/**
 * /incidents/getIncidentByAsigneeId
 * get incident by assignee userId
 * @param {object} req request
 */
var getIncidentByAsigneeId = (asigneeId) => {
    return incidents.getIncidentByAssignee(asigneeId, (err, data) => {
        if (err) {
            throw err;
        }

        return data
    });
}

/**
 * /incidents/getIncidentsById
 * get incident by incidentId
 * @param {object} req request
 */
var getIncidentsById = (incidentId) => {
    return incidents.getById(incidentId, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

/**
 * /incidents/getIncidentByCreatorId
 * get incident by creator userId
 * @param {object} req request
 */
var getIncidentByCreatorId = (req, res) => {
    return incidents.getIncidentByCreator(req.body.creatorId, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

/**
 * /incidents/updateIncident
 * update incident
  * @param {object} req request
 * @param {object} res response
 */
var updateIncident = (req, res) => {
    return incidents.update(req.body, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
}

/**
 * /incidents/deleteIncident
 * delete incident
  * @param {object} req request
 * @param {object} res response
 */
var deleteIncident = (req, res) => {
    return incidents.delete(req.body._id, req.body._rev, (err, data) => {
        if (err) {
            throw err;
        }
        return data
    });
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