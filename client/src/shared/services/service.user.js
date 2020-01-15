import Configuration from './configuration';
import CryptoJS from 'crypto-js';
class UserService {
    constructor() {
        this.config = new Configuration()
    }
    /**
     * Create incident
     */
    loginUser(data) {
        let username = data.get("username").value;
        let password = CryptoJS.AES.encrypt(data.get("password").value, "mysecretkey");

        let payload = {
            username: username,
            password: password.toString()
        }

        return fetch(this.config.LOGIN_USER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (!response.ok) {
                return this.handleResponseError(response.json());
            }
            return response.json();
        }).then(data => {
            return data;
        })
    }
    /**
     * Retrieve all incidents
     */
    // async getAllIncidents(data) {
    //     return fetch(this.config.GET_ALL_INCIDENTS_URL, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(response => {
    //             if (!response.ok) {
    //                 this.handleResponseError(response);
    //             }
    //             return response.json();
    //         }).then(data => {
    //             return data;
    //         })
    //         .catch(error => {
    //             this.handleError(error);
    //         });
    // }

    // /**
    //  * Retrieve incident by incident id
    //  */
    // async getIncidentsById() {
    //     return fetch(this.config.GET_INCIDENT_BY_ID)
    //         .then(response => {
    //             if (!response.ok) {
    //                 this.handleResponseError(response);
    //             }
    //             return response.json();
    //         }).then(data => {
    //             return data;
    //         })
    //         .catch(error => {
    //             this.handleError(error);
    //         });
    // }

    // async getIncidentsByCreatorId() {
    //     return fetch(this.config.GET_INCIDENT_BY_ID)
    //         .then(response => {
    //             if (!response.ok) {
    //                 this.handleResponseError(response);
    //             }
    //             return response.json();
    //         }).then(data => {
    //             return data;
    //         })
    //         .catch(error => {
    //             this.handleError(error);
    //         });
    // }

    handleResponseError(response) {
        console.log(response)
        throw new Error(response);
    }
    handleError(error) {
        console.log(error.message);
    }
}

export default UserService;