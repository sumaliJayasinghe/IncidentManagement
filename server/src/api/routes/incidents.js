const express = require('express');
const incidentRouter = express.Router();
var incidentsCon = require('../controllers/incident')

incidentRouter.post('/createIncident', incidentsCon.createIncident);
incidentRouter.get('/getIncidents', incidentsCon.getIncidents);
incidentRouter.post('/getIncidentsById', incidentsCon.getIncidentsById);
incidentRouter.post('/getIncidentsByAsigneeId', incidentsCon.getIncidentByAsigneeId);
incidentRouter.post('/getIncidentsByCreatorId', incidentsCon.getIncidentByCreatorId);
incidentRouter.post('/updateIncident', incidentsCon.updateIncident);
incidentRouter.post('/deleteIncident', incidentsCon.deleteIncident);

module.exports = incidentRouter

