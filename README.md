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

## Dependancies 

used "```nano```" to connect to couch database. you can use ```couchbase```

```bash
npm install nano --save
```
or 

```bash
npm install couchbase --save
```

used "```joi```" to validate schema

```bash
npm install joi --save
```

used "```jsonwebtoken```" for JWT authentication in login

```bash
npm install jsonwebtoken --save
```
used "```swagger-ui-express```" to have swagger

```bash
npm install swagger-ui-expres --save
```
used "```chai```" for unit testing

```bash
npm install swagger-ui-expres --save
```
Server -

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
    
Client -

    "bootstrap": "^4.4.1",
    "react-redux": "^7.1.3",
    "react-router": "^5.1.2",
    "react-router-dom": "^5.1.2"

## Folder Structure

Server

        src       
        |
        -----| app.js  
        -----| api
                |
                ------| controller    
                            |
                            ------| incident.js
                            ------| user.js
                ------| routes        API routing
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

Client

![Image of Yaktocat](https://github.com/sumaliJayasinghe/IncidentManagement/blob/master/images/Screenshot%202020-01-16%20at%2012.51.53%20AM.png)
        
## Docker

Created each dockerfile for Server Client and Database and compose all to "docker-compose.yml" 

```bash
docker build -t incident-management-db ./server/database/
docker build -t incident-management-server ./server/
docker build -t incident-management-client ./server/
docker-compose run -d 
```

there will be multiple roles in the system, for now we use only 2

ADMIN,
USER

can run swagger https://localhost:9000

