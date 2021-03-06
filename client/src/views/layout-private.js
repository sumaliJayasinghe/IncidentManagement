import React from 'react';
import { Switch, BrowserRouter as Redirect } from 'react-router-dom'
import { PrivateRoute } from './_privateRoute';
import { Home, Incident } from '../components/features';

export const PrivateLayout = (props) => (
    (props.location.pathname !== "/") ? <div>
        <Switch>
            <PrivateRoute path="/incident" component={Incident} />
            <PrivateRoute path="/createIncident" component={Incident} />
            <PrivateRoute path="/home" component={Home} />
        </Switch></div> : <Redirect to={{ pathname: '/login' }} />);