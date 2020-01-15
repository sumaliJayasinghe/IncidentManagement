import React, { Component } from 'react';
import { Table, Container, Pagination, Tabs, Tab } from 'react-bootstrap';
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
        console.log("componentDidMount")
        this.incidentService.getIncidentByCreator({ page: 1, creatorId: "sgsj005" }).then(item => {
            var active = 1;
            for (let number = 1; number <= item.data.totalpages; number++) {
                this.items.push(
                    <Pagination.Item key={number} active={number === active}>
                        {number}
                    </Pagination.Item>,
                );
            }
            this.props.onUpdateincidentList(item.data);
        });


    }

    navigateToIncident = (item) => {
        var data = {
            "dataList": []
        };
        this.props.selectIncident(item);
    }

    render() {
        return (

            < Container className="t-view" >
                <div className="title">
                    <h4>Ticket Summary - List of Tickets</h4>
                </div>

                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="All Incidents">
                        <div>
                            <p>
                                Full many a glorious morning have I seen Flatter the mountain tops with sovereign eye, Kissing with golden face the meadows green, Gilding pale streams with heavenly alchemy; Anon permit the basest clouds to ride With ugly rack on his celestial face, And from the forlorn world his visage hide, Stealing unseen to west with this disgrace: Even so my sun one early morn did shine, With all triumphant splendour on my brow;
                            </p>
                        </div>
                        <Table className="t-view" responsive striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="td-center">#</th>
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
                                            <td className="td-center">{index}</td>
                                            <td ><Link to={'/incident'} className="nav-link" onClick={() => this.navigateToIncident(item)}>{item.title}</Link></td>
                                            <td>{item.category}</td>
                                            <td className="td-center">{item.priority}</td>
                                            <td className="td-center">{item.createDate}</td>
                                            <td>{item.asignee && item.asignee.fullname}</td>
                                            <td className="td-center">{item.status && item.status.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Pagination className="pagination-align">{this.items}</Pagination>
                    </Tab>
                    <Tab eventKey="profile" title="Recently Updated">
                        <Table className="t-view" responsive striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="td-center">#</th>
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
                                            <td className="td-center">{index}</td>
                                            <td ><Link to={'/incident'} className="nav-link" onClick={() => this.navigateToIncident(item)}>{item.title}</Link></td>
                                            <td>{item.category}</td>
                                            <td className="td-center">{item.priority}</td>
                                            <td className="td-center">{item.createDate}</td>
                                            <td>{item.asignee && item.asignee.fullname}</td>
                                            <td className="td-center">{item.status && item.status.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Pagination className="pagination-align">{this.items}</Pagination>
                    </Tab>
                    <Tab eventKey="expires" title="About to expires">
                        <Table className="t-view" responsive striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="td-center">#</th>
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
                                            <td className="td-center">{index}</td>
                                            <td ><Link to={'/incident'} className="nav-link" onClick={() => this.navigateToIncident(item)}>{item.title}</Link></td>
                                            <td>{item.category}</td>
                                            <td className="td-center">{item.priority}</td>
                                            <td className="td-center">{item.createDate}</td>
                                            <td>{item.asignee && item.asignee.fullname}</td>
                                            <td className="td-center">{item.status && item.status.description}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Pagination className="pagination-align">{this.items}</Pagination>
                    </Tab>
                    <Tab eventKey="closed" title="Closed">
                        <Table className="t-view" responsive striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="td-center">#</th>
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
                                            <td className="td-center">{index}</td>
                                            <td ><Link to={'/incident'} className="nav-link" onClick={() => this.navigateToIncident(item)}>{item.title}</Link></td>
                                            <td>{item.category}</td>
                                            <td className="td-center">{item.priority}</td>
                                            <td className="td-center">{item.createDate}</td>
                                            <td>{item.asignee && item.asignee.fullname}</td>
                                            <td className="td-center">{item.status && item.status.description}</td>
                                        </tr>
                                    )
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

const mpaStateToProps = state => (console.log(state.incidents.incidents), {
    listIncidents: state.incidents.incidents,
    selectedIncident: state.incidents.selectIncident

})

const mapActionsToProps = {
    onUpdateincidentList: getAllIncident,
    selectIncident: getIncident
}

export default connect(mpaStateToProps, mapActionsToProps)(Home);