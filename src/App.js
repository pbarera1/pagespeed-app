import React, {Component} from 'react';
import './App.css';
import Dashboard from './components/site/Site';
import {Link} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Dashboard {...this.props} />
            </div>
        );
    }
}

export default App;

// everyday a cron will run the api calls form the given sites and send the data to mongo
