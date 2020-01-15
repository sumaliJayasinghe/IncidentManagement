process.env.NODE_ENV = 'test';
let sampleRequests = require("../../fixtures/testData")
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../../src/app');

chai.use(chaiHttp);
describe('Incident', () => {

    describe('/GET getIncidents', () => {
        it('it should GET all the incidents', (done) => {
            chai.request(app)
                .get('/api/v1/incidents/getIncidents')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST createIncident', () => {
        it('it should create a incident', (done) => {
            let incident = sampleRequests.createRequest

            chai.request(app)
                .post('/api/v1/incidents/createIncident')
                .send(incident)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').to.be.true;
                    res.body.should.have.property('rev');
                    res.body.should.have.property('id');
                    done();
                });
        });
    });

    describe('/POST updateIncident', () => {
        it('it should update incident', (done) => {
            let incident = sampleRequests.updateRequest;

            chai.request(app)
                .post('/api/v1/incidents/updateIncident')
                .send(incident)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').to.be.true;
                    res.body.should.have.property('rev');
                    res.body.should.have.property('id');
                    done();
                });
        });
    });

    describe('/POST deleteIncident', () => {
        it('it should delete incident', (done) => {
            let incident = {
                "doc": {
                    "_id": "7bb3ef2bb8123bf20b9cba49ce00f399",
                    "_rev": "1-2e73fe72085227f56c32728d72bea98d"
                }
            };

            chai.request(app)
                .post('/api/v1/incidents/deleteIncident')
                .send(incident)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').to.be.true;
                    res.body.should.have.property('rev');
                    res.body.should.have.property('id');
                    done();
                });
        });
    });

    describe('/GET getIncident by incidentId', () => {
        it('it should return incident object', (done) => {
            chai.request(app)
                .get('/api/v1/incidents/getIncidentsById/7f3j3o205')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').to.be.true;
                    res.body.should.have.property('_id');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('decription');
                    res.body.should.have.property('type');
                    res.body.should.have.property('criticallity');
                    res.body.should.have.property('createBy');
                    res.body.should.have.property('status');

                    done();
                });
        });

        it('it should not return incident object', (done) => {
            chai.request(app)
                .get('/api/v1/incidents/getIncidentsById/IN_7f3j3o205')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                })
        })
    });

    describe('/GET getIncident by creatorId', () => {
        it('it should return incident object', (done) => {
            chai.request(app)
                .get('/api/v1/incidents/getIncidentsByCreatorId/anaj001')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').to.be.true;
                    res.body.should.have.property('_id');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('decription');
                    res.body.should.have.property('type');
                    res.body.should.have.property('criticallity');
                    res.body.should.have.property('createBy');
                    res.body.should.have.property('status');

                    done();
                });
        });
    })
    describe('/GET getIncident by asigneeId', () => {
        it('it should return incident object', (done) => {
            chai.request(app)
                .get('/api/v1/incidents/getIncidentsByAsigneeId/anaj001')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('ok').to.be.true;
                    res.body.should.have.property('_id');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('decription');
                    res.body.should.have.property('type');
                    res.body.should.have.property('criticallity');
                    res.body.should.have.property('createBy');
                    res.body.should.have.property('status');

                    done();
                });
        });
    })
});