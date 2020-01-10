import React from 'react';
import { Switch } from 'react-router-dom'
import { PrivateRoute } from './_privateRoute';
import { Home, Incident } from '../components/features';
import { Header } from '../components/core';

export const PrivateLayout = (props) => (<div>
    <Header />
    <Switch>
        <PrivateRoute path="/incident" component={Incident} />
        <PrivateRoute path="/createIncident" component={Incident} />
        <PrivateRoute path="/home" component={Home} />
    </Switch></div>);