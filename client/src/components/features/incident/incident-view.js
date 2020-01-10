import store from '../../../core/store/store';
import React, { Component } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

const EnquiryResult = () => <Button className="btn" variant="danger" type="submit">Delete</Button>;

class Incident extends Component {

    constructor(props) {
        super(props);
        console.log(this.props)
        this.handleSubmitIncident = this.handleSubmitIncident.bind(this);
        this.incident = {}

        if (this.props.incidents.selectedIncident.incidentId) {
            this.incident = this.props.incidents.selectedIncident
        }

    }

    handleSubmitIncident(event) {

        console.log(this.props)
        alert("test")
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('/api/form-submit-url', {
            method: 'POST',
            body: data,
        });
    }

    getSelectedCategory(e) {
        console.log(e.target.value)
    }

    render() {
        return (
            <Container className="t-view">
                <div className="title">
                    <h4>Create Ticket</h4>
                </div>
                <Form className="t-view" onSubmit={this.handleSubmitIncident}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="text-label text-monospace">Title</Form.Label>
                        <Form.Control as="textarea" rows="1" value={this.props.incidents.selectedIncident.title}
                            onChange={this.getSelectedCategory} />
                    </Form.Group>
                    <Row>
                        <Col xs={6}><Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label className="text-label text-monospace">Category</Form.Label>
                            <Form.Control as="select" defaultValue={this.props.incidents.selectedIncident.category}
                                onChange={this.getSelectedCategory}>
                                <option value="" >Please select</option>
                                <option value="1" >Type1</option>
                                <option value="2" >Type2</option>
                                <option value="3" >Type3</option>
                                <option value="4" >Type4</option>
                                <option value="5" >Type5</option>
                            </Form.Control>
                        </Form.Group></Col>
                        <Col xs={6}> <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label className="text-label text-monospace">Priority</Form.Label>
                            <Form.Control as="select" defaultValue={this.props.incidents.selectedIncident.category}
                                onChange={this.getSelectedCategory}>
                                <option value="">Please select</option>
                                <option value="1">P1</option>
                                <option value="2">P2</option>
                                <option value="3">P3</option>
                                <option value="4">P4</option>
                                <option value="5">P5</option>
                            </Form.Control>
                        </Form.Group></Col>
                    </Row>


                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="text-label text-monospace">Description</Form.Label>
                        <Form.Control as="textarea" rows="3" value={this.props.incidents.selectedIncident.decription}
                            onChange={this.getSelectedCategory} />
                    </Form.Group>
                    <Row>
                        <Col xs={6}> <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label className="text-label text-monospace">Assignee</Form.Label>
                            <Form.Control as="select" defaultValue="Mark" defaultValue={this.props.incidents.selectedIncident.category}
                                onChange={this.getSelectedCategory}>
                                <option value="">Please select</option>
                                <option value="us1">User1</option>
                                <option value="us2">User2</option>
                                <option value="us3">User3</option>
                                <option value="us4">User4</option>
                                <option value="us5">User5</option>
                            </Form.Control>
                        </Form.Group></Col>
                    </Row>

                    <Button className="btn" variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
            </Container>
        );
    }
}
const mpaStateToProps = state => ({
    incidents: state.incidents

})
export default connect(mpaStateToProps)(Incident)