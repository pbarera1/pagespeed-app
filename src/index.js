import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Title from './components/title/title';
import Home from './components/home/home';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Route path="/" component={Title} />
        <Route exact path="/" component={Home} />
        <Route path="/aac" component={App} />
        <Route path="/facility" component={App} />
        <Route path="/library" component={App} />
        <Route path="/directory" component={App} />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
