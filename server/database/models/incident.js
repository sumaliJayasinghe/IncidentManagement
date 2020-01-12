var incidentsDB = require('../connection').use('incidents');
var schemas = require('../schemas');
var errors = require('../errors');
var diff = require('object-versions').diff;

module.exports = {
    create: schemas.validating('incident', 'create', createIncident),
    update: updateIncident,
    getAll: getAllIncidents,
    getIncidents: getIncidents,
    getById: getIncidentById,
    delete: deleteIncident,
    getIncidentByAssignee: getIncidentByAssignee,
    getIncidentByCreator: getIncidentByCreator
}

/**
 * Create incident
 * @param {*} incident incident object
 * @param {*} cb callback function
 */
function createIncident(incident, cb) {
    incident.createdDate = new Date().toISOString();
    incident.updatedDate = new Date().toISOString();
    incidentsDB.insert(incident, errors.wrapNano(cb));
};

/**
 * update incident
 * @param {*} incident incident object
 * @param {*} cb callback function
 */
function updateIncident(incident, cb) {
    incident.updatedDate = new Date().toISOString()
    incidentsDB.get(incident._id, errors.wrapNano(function (err, currentIncident) {
        if (err) {
            cb(err);
        } else {
            var incidentDiff = diff(currentIncident, incident);
            schemas.validate(incidentDiff, 'incident', 'update', function (err) {
                if (err) {
                    cb(err)
                } else {
                    incidentsDB.insert(incident, errors.wrapNano(cb));
                }
            })
        }
    }))
};

/**
 * retrieve all incidnets from database
 * @param {*} cb callback function
 */
function getAllIncidents(cb) {
    incidentsDB.list({
        include_docs: true
    }, errors.wrapNano(function (err, result) {
        if (err) {
            cb(err);
        } else {
            // var res = {
            var dataList = []
            // }
            result.rows.forEach(row => {
                if (row.doc.incidentId)
                    dataList.push(row.doc)
            });
            cb(null, dataList);

        }
    }));
};

function getIncidents(req, cb) {

    console.log(req.page);
    console.log(req.limit);
    incidentsDB.list({
        include_docs: true,
        limit: req.limit,
        skip: (req.page == 1) ? 0 : req.page * req.limit
    }, errors.wrapNano(function (err, result) {
        if (err) {
            cb(err);
        } else {
            // var res = {
            var dataList = []
            // }
            result.rows.forEach(row => {
                if (row.doc.incidentId)
                    dataList.push(row.doc)
            });
            cb(null, dataList);

        }
    }));
};

/**
 * retrieve incidents by id
 * @param {*} id incident id
 * @param {*} cb callback function
 */
function getIncidentById(id, cb) {
    incidentsDB.view('by_incidentId', 'by_incidentId', { 'key': id, 'include_docs': true },
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

/**
 * delete incident
 * @param {*} id doc id
 * @param {*} rev doc revision
 * @param {*} cb callback function
 */
function deleteIncident(id, rev, cb) {
    incidentsDB.destroy(id, rev, errors.wrapNano(cb));
};

/**
 * get incident by assignee userId
 * @param {*} id assignee user id
 * @param {*} cb callabck function
 */
function getIncidentByAssignee(id, cb) {
    incidentsDB.view('by_asignee', 'by_asignee', { 'key': id, 'include_docs': true },
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

/**
 * get incident by creator user id
 * @param {*} id creatoe user id 
 * @param {*} cb callback function
 */
function getIncidentByCreator(id, cb) {
    incidentsDB.view('by_creator', 'by_creator', { keys: [id], include_docs: true },
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

