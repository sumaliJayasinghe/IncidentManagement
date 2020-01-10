import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends Component {
    render() {
        return (<React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" className="content-center">
                <h2>Incident Management</h2>
                <form noValidate autoComplete="off">
                    <div className="text-field-margin"> <TextField id="standard-basic" label="Username" /></div>
                    <div className="text-field-margin"> <TextField id="standard-basic" label="Password" /></div>
                    <div className="text-field-margin"><Button variant="contained" color="primary">
                        Login
                    </Button></div>
                </form>
            </Container>
        </React.Fragment>)
    }
}

export default Login