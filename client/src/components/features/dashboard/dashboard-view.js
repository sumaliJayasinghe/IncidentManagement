import React, { Component } from 'react';
import './dashboard-styles.css'
import { Table, Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getIncident, getAllIncident } from '../../../core/store/actions/incidentActions';
// import history from '../../../history';
import IncidentService from '../../../shared/services/service.incident';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Home extends Component {

    constructor(props) {
        super(props);
        this.incidentService = new IncidentService();
        this.navigateToIncident = this.navigateToIncident.bind(this)
    }

    componentDidMount() {
        this.incidentService.getAllIncidents().then(item => {
            console.log(item)
            this.props.onUpdateincidentList(item);
            console.log(this.props)
        });
    }

    navigateToIncident = (item) => {
        // console.log(item)
        var data = {
            "dataList": []
        };
        // data.dataList.push(item)
        this.props.selectIncident(item)
        // console.log(this.props.incidents)
        // history.push('/incident', {
        //     view: true
        // });


    }

    render() {
        // console.log(this.props.incidents.dataList)
        return (
            <Container className="t-view">
                <div className="title">
                    <h4>Ticket Summary - List of Tickets</h4>
                </div>

                <Table className="t-view" responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Created Date</th>
                            <th>Asignee</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.listIncidents.dataList && this.props.listIncidents.dataList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td ><Link to={'/incident'} className="nav-link" onClick={() => this.navigateToIncident(item)}>{item.title}</Link></td>
                                    <td>{item.category}</td>
                                    <td>{item.priority}</td>
                                    <td>{item.createDate}</td>
                                    <td>{item.asignee && item.asignee.fullname}</td>
                                    <td>{item.status && item.status.description}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Container>
        );
    }

}

const mpaStateToProps = state => (
    console.log(state), {
        listIncidents: state.incidents.incidents,
        selectedIncident: state.incidents.selectIncident

    })

const mapActionsToProps = {
    onUpdateincidentList: getAllIncident,
    selectIncident: getIncident
}

export default connect(mpaStateToProps, mapActionsToProps)(Home);