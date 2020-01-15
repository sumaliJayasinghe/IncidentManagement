import Configuration from './configuration';
class IncidentService {
    constructor() {
        this.config = new Configuration()
    }
    /**
     * Create incident
     */
    async createIncident(data) {
        let loggedInUser = JSON.parse(localStorage.getItem('user'));

        let payload = {
            "category": data.get("category").value,
            "title": data.get("title").value,
            "description": data.get("description").value,
            "priority": data.get("priority").value,
            "createdBy": {
                "fullname": loggedInUser.fullName,
                "userId": loggedInUser.userId,
                "email": loggedInUser.email
            },
            "assignee": {
                "fullname": loggedInUser.fullName,
                "userId": loggedInUser.userId,
                "email": loggedInUser.email
            }
        }

        return fetch(this.config.POST_INCIDENT, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.status !== 200) {
                return this.handleResponseError(data);
            }
            return data;
        })
    }
    /**
     * Retrieve all incidents
     */
    async getAllIncidents(data) {
        return fetch(this.config.GET_ALL_INCIDENTS_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.status !== 200) {
                return this.handleResponseError(data);
            }
            return data;
        })
    }

    /**
     * Retrieve incident by incident id
     */
    async getIncidentsById(data) {
        return fetch(this.config.GET_INCIDENT_BY_ID, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.status !== 200) {
                return this.handleResponseError(data);
            }
            return data;
        })
    }

    async getIncidentByCreator(data) {
        return fetch(this.config.GET_INCIDENT_BY_CREATOR_ID, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(data => {
            if (data.status !== 200) {
                return this.handleResponseError(data);
            }
            return data;
        })
    }

    handleResponseError(response) {
        throw response;
    }
}

export default IncidentService;