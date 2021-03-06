import React, { Component } from 'react';
import { Table, Container, Pagination, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getIncident, getAllIncident } from '../../../core/store/actions/incidentActions';
import IncidentService from '../../../shared/services/service.incident';
import { Link } from 'react-router-dom';

class Home extends Component {
    items = [];
    constructor(props) {
        super(props);
        this.incidentService = new IncidentService();
        this.navigateToIncident = this.navigateToIncident.bind(this)
    }

    componentDidMount() {
        if (JSON.parse(localStorage.getItem('user')).role.code === "ADMIN") {
            this.incidentService.getIncidentByCreator({ page: 1, creatorId: JSON.parse(localStorage.getItem('user')).userId }).then(item => {
                let active = 1;
                if (item.data.totalpages > 0) {
                    for (let number = 1; number <= item.data.totalpages; number++) {
                        this.items.push(
                            <Pagination.Item key={number} active={number === active}>
                                {number}
                            </Pagination.Item>,
                        );
                    }
                }

                this.props.onUpdateincidentList(item.data);
            });
        } else {
            this.incidentService.getIncidentByAssignee({ page: 1, assigneeId: JSON.parse(localStorage.getItem('user')).userId }).then(item => {
                let active = 1;
                if (item.data.totalpages > 0) {
                    for (let number = 1; number <= item.data.totalpages; number++) {
                        this.items.push(
                            <Pagination.Item key={number} active={number === active}>
                                {number}
                            </Pagination.Item>,
                        );
                    }
                }

                this.props.onUpdateincidentList(item.data);
            });
        }
    }

    navigateToIncident = (item) => {
        this.props.selectIncident(item);
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    render() {


        let resolved = (this.props.listIncidents.dataList) ? this.props.listIncidents.dataList.filter(function (item) {
            return item.status.code === "RESOLVED"
        }) : [];


        return (
            < Container className="t-view" >
                <div className="title">
                    <h4>Ticket Summary - List of Tickets</h4>
                </div>
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="t-view">
                    <Tab eventKey="home" title="All Incidents">
                        <Table className="t-view" responsive striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="td-center">#</th>
                                    <th className="td-center">Title</th>
                                    <th className="td-center">Category</th>
                                    <th className="td-center">Priority</th>
                                    <th className="td-center">Created Date</th>
                                    <th className="td-center">Asignee</th>
                                    <th className="td-center">created By</th>
                                    <th className="td-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.props.listIncidents.dataList && this.props.listIncidents.dataList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="td-center">{index}</td>
                                            <td ><Link to={'/incident'} className="nav-link" onClick={() => this.navigateToIncident(item)}>{item.title}</Link></td>
                                            <td className="td-center">{item.category}</td>
                                            <td className="td-center">{item.priority}</td>
                                            <td className="td-center">{this.formatDate(item.createdDate)}</td>
                                            <td className="td-center">{item.assignee && item.assignee.fullname}</td>
                                            <td>{item.createdBy && item.createdBy.fullname}</td>
                                            <td className="td-center">{item.status && item.status.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Pagination className="pagination-align">{this.items}</Pagination>
                    </Tab>
                    <Tab eventKey="closed" title="Resolved">
                        <Table className="t-view" responsive striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="td-center">#</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Priority</th>
                                    <th>Created Date</th>
                                    <th>Asignee</th>
                                    <th>created By</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {resolved && resolved.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="td-center">{index}</td>
                                            <td ><Link to={'/incident'} className="nav-link" onClick={() => this.navigateToIncident(item)}>{item.title}</Link></td>
                                            <td>{item.category}</td>
                                            <td className="td-center">{item.priority}</td>
                                            <td className="td-center">{this.formatDate(item.createdDate)}</td>
                                            <td className="td-center">{item.assignee && item.assignee.fullname}</td>
                                            <td>{item.createdBy && item.createdBy.fullname}</td>
                                            <td className="td-center">{item.status && item.status.description}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </Table>
                        <Pagination className="pagination-align">{this.items}</Pagination>
                    </Tab>
                </Tabs>

            </Container >
        );
    }
}

const mpaStateToProps = state => ({
    listIncidents: state.incidents.incidents,
    selectedIncident: state.incidents.selectIncident
})

const mapActionsToProps = {
    onUpdateincidentList: getAllIncident,
    selectIncident: getIncident
}

export default connect(mpaStateToProps, mapActionsToProps)(Home);