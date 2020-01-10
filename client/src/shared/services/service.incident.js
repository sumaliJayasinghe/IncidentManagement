import Configuration from './configuration';
class IncidentService {
    constructor() {
        this.config = new Configuration()
    }
    /**
     * Create incident
     */
    async createIncident() {
        return fetch(this.config.POST_INCIDENT)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            }).then(data => {
                return data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }
    /**
     * Retrieve all incidents
     */
    async getAllIncidents() {
        return fetch(this.config.GET_ALL_INCIDENTS_URL)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            }).then(data => {
                return data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    /**
     * Retrieve incident by incident id
     */
    async getIncidentsById() {
        return fetch(this.config.GET_INCIDENT_BY_ID)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            }).then(data => {
                return data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    async getIncidentsByCreatorId() {
        return fetch(this.config.GET_INCIDENT_BY_ID)
            .then(response => {
                if (!response.ok) {
                    this.handleResponseError(response);
                }
                return response.json();
            }).then(data => {
                return data;
            })
            .catch(error => {
                this.handleError(error);
            });
    }

    handleResponseError(response) {
        throw new Error("HTTP error, status = " + response.status);
    }
    handleError(error) {
        console.log(error.message);
    }
}

export default IncidentService;