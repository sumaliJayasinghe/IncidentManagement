class Configuration {

    POST_INCIDENT = "http://localhost:8000/api/v1/incidents/createIncident";
    GET_ALL_INCIDENTS_URL = "http://localhost:8000/api/v1/incidents/getIncidents";
    GET_INCIDENT_BY_ID = "http://localhost:8000/api/v1/incidents/getIncidentsById";
    GET_INCIDENT_BY_ASSIGNEE_ID = "http://localhost:8000/api/v1/incidents/getIncidentsByAsigneeId";
    GET_INCIDENT_BY_CREATOR_ID = "http://localhost:8000/api/v1/incidents/getIncidentsByCreatorId";
    UPDATE_INCIDENT = "http://localhost:8000/api/v1/incidents/updateIncident";
    DELETE_INCIDENT = "http://localhost:8000/api/v1/incidents/deleteIncident";

}
export default Configuration;