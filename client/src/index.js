import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './core/store/store'
import { Provider } from "react-redux"
import { PrivateRoute, Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'
import Header from './components/core/header/header-view'
import { Home, Incident } from './components/features';
import history from './history';


const initstore = store();
const routing = (
    <Provider store={initstore}>
        <Header />
        <Router history={history}>
            <div>
                <PrivateRoute exact path="/" component={App} />
                <Route path="/incident" component={Incident} />
                <Route path="/createIncident" component={Incident} />
                <Route path="/home" component={Home} />
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
