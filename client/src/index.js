import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './core/store/store'
import { Provider } from "react-redux"
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Header } from './components/core';
import history from './history';
import { PrivateLayout, LoginLayout } from './views';

const initstore = store();


const PublicLayout = (props) => (<div>
    <Header />
    <Switch>
        {/* <Route exact path='/signin' component={SigninForm} />
        <Route exact path='/signup' component={Signup} /> */}
    </Switch></div>);


const routing = (
    <Provider store={initstore}>
        <Router history={history}>
            <div>
                <Route path='/app' component={PrivateLayout} />
                <Route path='/' component={LoginLayout} />
                {/* <Route path="incident/:id" component={Incident} /> */}
            </div>
        </Router>
    </Provider>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
