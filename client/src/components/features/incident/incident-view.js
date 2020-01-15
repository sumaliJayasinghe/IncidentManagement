import React, { Component } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import IncidentService from '../../../shared/services/service.incident';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";
import IncidentView from './incident-edit-view';
import { logError } from '../../../core/store/actions/errorAction';
import { getIncident } from '../../../core/store/actions/incidentActions';

class Incident extends Component {
    state = {
        edit: false
    }

    constructor(props) {
        super(props);

        this.incidentService = new IncidentService();

        this.submitForm = this.submitForm.bind(this);

        this.incident = {};

        if (this.props.incidents.selectedIncident.incidentId) {
            this.incident = this.props.incidents.selectedIncident;
        }

        this.incidentForm = FormBuilder.group({
            title: ["", Validators.required],
            category: ["", Validators.required],
            priority: ["", Validators.required],
            description: [""],
            assignee: ["", Validators.required]
        });
    }

    edit = () => {
        this.setState({
            edit: true
        })
    }

    // form submission
    submitForm(e) {
        e.preventDefault();
        if (JSON.parse(localStorage.getItem('user')).role.code === "USER") {
            this.props.incidents.selectedIncident.status = {
                code: "RESOLVED",
                description: "Resolved"
            }
            this.incidentService.updateIncident(this.props.incidents.selectedIncident).then(item => {

                return this.incidentService.getIncidentsById({ page: 1, id: item.data.id })
            }).then(result => {
                this.props.selectIncident(result.data.data);
            }).catch(e => {
                this.props.logError(e.message)
            });
        } else {
            this.incidentService.createIncident(this.incidentForm).then(item => {
                this.loginForm.reset();
            }).catch(e => {
                this.props.logError(e.message)
            });
        }

    }

    // render edit incident view dynamacally
    renderEditView = () => {
        if (this.props.incidents.selectedIncident && this.props.incidents.selectedIncident.incidentId && !this.state.edit) {
            let displayValue = {
                title: this.props.incidents.selectedIncident.title,
                category: this.props.incidents.selectedIncident.category,
                priority: this.props.incidents.selectedIncident.priority,
                description: this.props.incidents.selectedIncident.description,
                status: this.props.incidents.selectedIncident.status.description,
                createdDate: this.props.incidents.selectedIncident.createDate,
                assignee: this.props.incidents.selectedIncident.assignee.fullname
            }
            return (<diiv><IncidentView {...displayValue} className="t-view" />
                {(this.props.incidents.selectedIncident && this.props.incidents.selectedIncident.status.code != "RESOLVED") ? <Button variant="primary" type="submit" onClick={this.submitForm}>
                    Resolve
         </Button> : null}</diiv>)

        } else {
            return <FieldGroup
                control={this.incidentForm}
                render={({ get, invalid }) => (
                    <form onSubmit={this.submitForm} className="t-view">
                        <FieldControl
                            name="title"
                            render={({ handler, touched, hasError }) => (
                                <Form.Group controlId="title">
                                    <Form.Label>Title *</Form.Label>
                                    <Form.Control type="text" {...handler()} />
                                    <Form.Text className="text-error">
                                        {touched
                                            && hasError("required")
                                            && "Title is required."}
                                    </Form.Text>
                                </Form.Group>
                            )} />
                        <Row><Col xs={6}>
                            <FieldControl
                                name="category"
                                render={({ handler, touched, hasError }) => (
                                    <Form.Group controlId="category">
                                        <Form.Label>Category *</Form.Label>
                                        <Form.Control as="select" {...handler(this.props.incidents.selectedIncident.category)}
                                        >
                                            <option value="" >Please select</option>
                                            <option value="Cat_1" >Cat_1</option>
                                            <option value="Cat_2" >Cat_2</option>
                                            <option value="Cat_3" >Cat_3</option>
                                            <option value="Cat_4" >Cat_4</option>
                                            <option value="Cat_5" >Cat_5</option>
                                        </Form.Control>
                                        <Form.Text className="text-error">
                                            {touched
                                                && hasError("required")
                                                && "category is required."}
                                        </Form.Text>
                                    </Form.Group>
                                )} />
                        </Col><Col xs={6}>
                                <FieldControl
                                    name="priority"
                                    render={({ handler, touched, hasError }) => (
                                        <Form.Group controlId="priority">
                                            <Form.Label>priority</Form.Label>
                                            <Form.Control as="select" {...handler()} defaultValue={this.props.incidents.selectedIncident.category}
                                            >
                                                <option value="">Please select</option>
                                                <option value="P1">P1</option>
                                                <option value="P2">P2</option>
                                                <option value="P3">P3</option>
                                                <option value="P4">P4</option>
                                                <option value="P5">P5</option>
                                            </Form.Control>
                                            <Form.Text className="text-error">
                                                {touched
                                                    && hasError("required")
                                                    && "Priority is required."}
                                            </Form.Text>
                                        </Form.Group>
                                    )} />
                            </Col></Row>
                        <Row>
                            <Col xs={6}>
                                <FieldControl
                                    name="status"
                                    render={({ handler, touched, hasError }) => (
                                        <Form.Group controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            <p className="view-text-value">New</p>
                                        </Form.Group>
                                    )} />
                            </Col>
                            <Col xs={6}>
                                <FieldControl
                                    name="createdDate"
                                    render={({ handler, touched, hasError }) => (
                                        <Form.Group controlId="createdDate">
                                            <Form.Label>Created Date</Form.Label>
                                            <p className="view-text-value">2020-01-20</p>
                                        </Form.Group>
                                    )} />
                            </Col>
                        </Row>
                        <FieldControl
                            name="description"
                            render={({ handler, touched, hasError }) => (
                                <Form.Group controlId="description">
                                    <Form.Label>Description *</Form.Label>
                                    <Form.Control as="textarea" {...handler()} rows="3"
                                    />
                                </Form.Group>
                            )} />

                        <Row><Col xs={6}>
                            <FieldControl
                                name="assignee"
                                render={({ handler, touched, hasError }) => (
                                    <Form.Group controlId="assignee">
                                        <Form.Label>Assignee *</Form.Label>
                                        <Form.Control as="select" {...handler()} defaultValue={this.props.incidents.selectedIncident.category}
                                        >
                                            <option value="">Please select</option>
                                            <option value="sgsj001">Suki Andrew</option>
                                            <option value="us2">User2</option>
                                            <option value="us3">User3</option>
                                            <option value="us4">User4</option>
                                            <option value="us5">User5</option>
                                        </Form.Control>
                                        <Form.Text className="text-error">
                                            {touched
                                                && hasError("required")
                                                && "Assignee is required."}
                                        </Form.Text>
                                    </Form.Group>
                                )} />
                        </Col></Row>
                        <FieldControl
                            name="remarks"
                            render={({ handler, touched, hasError }) => (
                                <Form.Group controlId="remarks">
                                    <Form.Label>Remarks *</Form.Label>
                                    <Form.Control as="textarea" {...handler()} rows="3"
                                    />
                                </Form.Group>
                            )} />

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                )} />
        }
    }

    render() {
        return (
            <Container className="t-view">
                <div className="title">
                    {(this.props.incidents.selectedIncident && this.props.incidents.selectedIncident.incidentId) ?
                        <div><h4>Ticket : {this.props.incidents.selectedIncident.title} [{this.props.incidents.selectedIncident.incidentId}]</h4> <hr /></div>
                        : <h4>Create Ticket </h4>}
                </div>

                {/* {(this.props.incidents.selectedIncident && this.props.incidents.selectedIncident.incidentId && !this.state.edit) ?
                    <Button variant="primary" onClick={this.edit}>Edit</Button>
                    : null} */}
                {this.renderEditView()}
            </Container>
        );
    }
}

const mpaStateToProps = state => ({
    incidents: state.incidents,
    selectedIncident: state.incidents.selectIncident
});

const mpaActionToProps = {
    logError: logError,
    selectIncident: getIncident
};

export default connect(mpaStateToProps, mpaActionToProps)(Incident)