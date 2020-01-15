import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './core/store/store'
import { Provider } from "react-redux"
import { Route, Redirect, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Header, Error } from './components/core/index';
import history from './history';
import { PrivateLayout, LoginLayout } from './views';

const initstore = store();

function requireLogin() {
    console.log(initstore.getState());
}

const routing = (
    <Provider store={initstore}>
        <Router history={history}>
            <Error />
            <div>
                <Route path='/' component={PrivateLayout} onEnter={requireLogin} />
                <Route exact path='/login' component={App} />
            </div>
        </Router>
    </Provider>
)
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
