import React, { Component } from 'react';
import { Navbar, NavDropdown, Button, Nav, Form, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

class Header extends Component {

    state = {
        redirect: false
    }

    renderRedirect = () => {
        if (this.state.redirect)
            return <Redirect to={{ pathname: '/incident' }} />
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    goToHome = () => {
        return <Redirect to={{ pathname: '/home' }} />
    }

    render() {
        return (
            <Navbar className="bg-black" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="link-home" to="/home" isActive={(match, location) => {

                                if (!match) {
                                    return false;
                                }
                            }
                            }> Home</NavLink>
                            <NavLink className="link-usermanagement" to="/home" activeClassName="selectedLink">User Management</NavLink>
                        </Nav>
                        {this.props.user.userId && this.props.user.role.code === "ADMIN" ?
                            <Form inline>
                                <Button variant="outline-success" onClick={this.setRedirect}>Create New</Button>
                                {this.renderRedirect()}
                            </Form>
                            : null}
                        <Nav>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">My Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/login">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

const mpaStateTpProps = state => ({
    incidents: state.incidents,
    user: state.user.loggedInUserDetail
});

export default connect(mpaStateTpProps)(Header);