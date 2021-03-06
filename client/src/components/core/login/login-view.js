import React, { Component } from 'react';
import { Error } from '../index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Button,
    Container,
    Form
} from 'react-bootstrap';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";
import { loginUser } from '../../../core/store/actions/userAction';
import UserService from '../../../shared/services/service.user';
import { logError } from '../../../core/store/actions/errorAction';

class Login extends Component {

    constructor(props) {
        super(props);

        this.userService = new UserService();

        this.login = this.login.bind(this);
        this.loginForm = FormBuilder.group({
            username: ["", Validators.required],
            password: ["", Validators.required],
            rememberMe: false
        });
    }

    // reset form
    handleReset = () => {
        this.loginForm.reset();
    }

    // user login
    login(e) {
        e.preventDefault();
        if (this.loginForm.get('username').value && this.loginForm.get('username').value) {
            this.userService.loginUser(this.loginForm).then(item => {
                this.props.login(item.data);
                localStorage.setItem('user', JSON.stringify(item.data));
            }).catch(e => {
                this.props.logError(e.message)
            });
        }
    }

    // redirect to home
    renderRedirect = () => {
        if (this.props.user.userId) {
            return <Redirect to={{ pathname: '/home' }} />
        }
    }

    render() {
        return (<React.Fragment>
            <Error />
            <Container maxWidth="sm" className="login-container" >
                <h2 className="content-center">Incident Management</h2>
                <FieldGroup
                    control={this.loginForm}
                    render={({ get, invalid }) => (
                        <form onSubmit={this.login} className="login-form">
                            <FieldControl
                                name="username"
                                render={({ handler, touched, hasError }) => (
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" {...handler()} />
                                        <Form.Text className="text-error">
                                            {touched
                                                && hasError("required")
                                                && "Username is required."}
                                        </Form.Text>
                                    </Form.Group>
                                )} />
                            <FieldControl
                                name="password"
                                render={({ handler, touched, hasError }) => (
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" {...handler()} />
                                        <Form.Text className="text-error">
                                            {touched
                                                && hasError("required")
                                                && "Password is required."}
                                        </Form.Text>
                                    </Form.Group>
                                )} />
                            <div className="content-center">
                                <Button variant="primary" type="submit" className="login-button">
                                    Login
                                </Button>
                            </div>
                        </form>
                    )} />
                {this.renderRedirect()}
            </Container>
        </React.Fragment>)
    }
}
const mpaStateToProps = state => ({
    user: state.user.loggedInUserDetail
})

const mpaActionToProps = {
    login: loginUser,
    logError: logError
};

export default connect(mpaStateToProps, mpaActionToProps)(Login);