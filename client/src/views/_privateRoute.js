import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Header } from '../components/core';
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <div><Header /><Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
    )} /></div>
)