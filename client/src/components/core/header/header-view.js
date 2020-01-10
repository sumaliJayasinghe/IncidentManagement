import React, { Component } from 'react';
import { Navbar, NavDropdown, Button, Nav, Form, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import history from '../../../history';
class Header extends Component {

    constructor(props) {
        console.log(props)
        super(props);
        // this.onClicktry = this.onClicktry.bind(this)
    }


    componentDidMount() {
        //     fetch('http://localhost:8000/api/v1/incidents/getIncidents')
        //         .then(res => res.json())
        //         .then((data) => {
        //             console.log(data)
        //             this.props.onUpdateincidentList(data)
        //         })
        //         .catch(console.log)
    }

    redirect = () => {
        history.push('/createIncident');
    }

    loadDashboard = () => {
        history.push('/home');
    }

    render() {
        console.log(this.props.incidents.dataList)
        return (
            <Navbar className="bg-black" expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">Incident Management System</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link className="link-home" onClick={this.loadDashboard}>Home</Nav.Link>
                            <Nav.Link className="link-usermanagement" >User Management</Nav.Link>

                        </Nav>
                        <Form inline>
                            {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
                            <Button variant="outline-success" onClick={this.redirect}>Create New</Button>
                        </Form>
                        <Nav>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

}

const mpaStateTpProps = state => ({
    incidents: state.incidents

})

// const mapActionsToProps = {
//     onUpdateincidentList: createIncident
// }

export default connect(mpaStateTpProps)(Header);