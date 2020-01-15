import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Header, Error } from '../components/core';
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <div><Header /> <Error /><Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
    )} /></div>
)