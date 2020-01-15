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

export default UserService;