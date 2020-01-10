import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from '../components/app/App';

export const LoginLayout = () => (
    <div>
        <Switch>
            <Route exact path="/login" component={App}></Route>
        </Switch>
    </div>);