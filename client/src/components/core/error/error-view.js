import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { logError } from '../../../core/store/actions/errorAction';

class Error extends Component {

    setRender = () => {
        if (this.props.errormessage) {
            setTimeout(
                function () {
                    this.props.logError(null)
                }
                    .bind(this),
                3000
            );
            return <Alert variant='danger'>{this.props.errormessage}</Alert>
        }
    }

    render() {
        return (
            <div> {this.setRender()}</div>
        )
    }
}

const mpaStateTpProps = state => (console.log(state), {
    errormessage: state.error.errorMessage
});

const mpaActionToProps = {
    logError: logError
};

export default connect(mpaStateTpProps, mpaActionToProps)(Error);