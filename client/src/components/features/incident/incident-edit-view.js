import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const IncidentView = ({ title, category, priority, decription, status, createdDate, assignee }) => (
    <Form>
        <Form.Group controlId="formBasicEmail" className="view-row-top-margin">
            <Form.Label className="view-text-label">Title *</Form.Label>
            <p className="view-text-value">{title}</p>
        </Form.Group>
        <Row><Col xs={6}>
            <Form.Group controlId="formBasicPassword" className="view-row-top-margin">
                <Form.Label className="view-text-label">Category *</Form.Label>
                <p className="view-text-value">{category}</p>
            </Form.Group>
        </Col><Col xs={6}>
                <Form.Group controlId="formBasicPassword" className="view-row-top-margin">
                    <Form.Label className="view-text-label">Priority *</Form.Label>
                    <p className="view-text-value">{priority}</p>
                </Form.Group>
            </Col></Row>
        <Row><Col xs={6}>
            <Form.Group controlId="formBasicPassword" className="view-row-top-margin">
                <Form.Label className="view-text-label">Status *</Form.Label>
                <p className="view-text-value">{status}</p>
            </Form.Group>
        </Col><Col xs={6}>
                <Form.Group controlId="formBasicPassword" className="view-row-top-margin">
                    <Form.Label className="view-text-label">Created Date *</Form.Label>
                    <p className="view-text-value">{createdDate}</p>
                </Form.Group>
            </Col></Row>

        <Form.Group controlId="formBasicPassword" className="view-row-top-margin">
            <Form.Label className="view-text-label">Description *</Form.Label>
            <p className="view-text-value">{decription}</p>
        </Form.Group>
        <Row><Col xs={6}>
            <Form.Group controlId="formBasicPassword" className="view-row-top-margin">
                <Form.Label className="view-text-label">Assignee *</Form.Label>
                <p className="view-text-value">{assignee}</p>
            </Form.Group>
        </Col></Row>
    </Form>
);

export default IncidentView