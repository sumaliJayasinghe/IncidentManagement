import React, { Component } from 'react';
import './dashboard-styles.css'
import { Table, Container, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getIncident, getAllIncident } from '../../../core/store/actions/incidentActions';
// import history from '../../../history';
import IncidentService from '../../../shared/services/service.incident';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Home extends Component {
    items = [];
    constructor(props) {
        super(props);
        this.incidentService = new IncidentService();
        this.navigateToIncident = this.navigateToIncident.bind(this)
    }

    componentDidMount() {
        this.incidentService.getAllIncidents({ page: 1, limit: 10 }).then(item => {
            console.log(item)
            this.props.onUpdateincidentList(item);
            console.log(this.props)
        });

        var active = 2;

        for (let number = 1; number <= 5; number++) {
            this.items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }
    }

    navigateToIncident = (item) => {
        var data = {
            "dataList": []
        };
        console.log(item)
        this.props.selectIncident(item);
    }

    render() {
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
                    <Pagination>{this.items}</Pagination>
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