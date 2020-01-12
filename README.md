# IncidentManagement

## Installation and run application
Client - 
```bash
npm start
```
Server - 
```bash
npm start
```

##Dependancies 

used "```nano```" to connect to couch database
used "```joi```" to validate schema
used "```jsonwebtoken```" for JWT authentication in login
used "```swagger-ui-express```" to have swagger

```Server```
    "async": "^3.1.0",
    "body-parser": "^1.19.0",
    "boom": "^7.3.0",
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "config": "^3.2.4",
    "cookie-parser": "^1.4.4",
    "deep-equal": "^1.1.1",
    "express": "^4.17.1",
    "joi": "^14.3.1",
    "jsonwebtoken": "^8.5.1",
    "mocha": "^6.2.2",
    "nano": "^8.1.0" 
    "swagger-ui-express": "^4.1.2"

```Client```
    "bootstrap": "^4.4.1",
    "react-redux": "^7.1.3",
    "react-router": "^5.1.2",
    "react-router-dom": "^5.1.2"

##Folder Structure

```Server ```

        src
        |
        -----| app.js  
        -----| api
                |
                ------| controller
                            |
                            ------| incident.js
                            ------| user.js
                ------| routes
                            |
                            ------| incident.js
                            ------| user.js
                ------| services
                            |
                            ------| incident.service.js
                            ------| user.service.js
        -----| common
                |
                ------| authorization.js
        -----| static
                |
                ------| roles.js
        -----| utility
                |
                ------| util.js
        | 
        database
        |
        -----| connection.js
        -----| createDatabse.js
        -----| models
                |
                ------| incident.js
                ------| user.js
        -----| schemas
                |
                ------| user-schemas.js
                ------| incident-schemas.js
                ------| index.js
        -----| views
                |
                ------| incident.js
                ------| user.js
        test
        |

```Client ```

       src
        |
        |-----| index.js  
        |-----| core
                |
                |------| store
                            |
                            |------| actions
                                        |
                                        |------| incidentActions.js
                                        |------| userActions.js
                            |------| constants
                                        |
                                        |------| incidentActionTypes.js
                                        |------| userActionTypes.js
                            |------| reducers
                                        |
                                        |------| incidentReducer.js
                                        |------| userReducer.js
                |------| routes
                            |
                            |------| incident.js
                            |------| user.js
                |------| services
                            |
                            |------| incident.service.js
                            |------| user.service.js
        |-----| components
                |
                |------| app
                          |
                          |------| App.js
                          |------| user.js
                |------| core
                          |
                          |------| header
                                    |
                                    |------| header-view.js
                                    |------| index.js
                          |------| login
                                    |
                                    |------| login-view.js
                                    |------| index.js
        |-----| features
                |
                |------| dashboard
                           |
                           |------| dashboard-view.js
                           |------| index.js
                 |------| incident
                           |
                           |------| incident-view.js
                           |------| index.js
        
Each incident have following status in its lifecycle

NEW
RE_OPENED
ASSIGNED
IN_PROGRESS
RESOLVED
CLOSED
CANCELED

there will be multiple roles in the system, for now we use only 3

SERVICE_DESK
INCIDENT_ANALYST
INCIDENT_MANAGER

can run swagger localhost:9000

