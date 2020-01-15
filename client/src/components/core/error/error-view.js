import React, { Component } from 'react';
import { Navbar, NavDropdown, Button, Nav, Form, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import history from '../../../history';
import { Link, Redirect } from 'react-router-dom';
class Error extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>{this.props.errormessage}</p>);
    }

}
const mpaStateTpProps = state => ({
    errormessage: state.errorMessage
});

export default connect(mpaStateTpProps)(Error);