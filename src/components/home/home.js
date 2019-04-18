import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './home.css';

export default props => {
    return (
        <div className="home">
            <h2 style={{textAlign: 'center'}}>Pick your portfolio</h2>
            <div className="home__container">
                <Link to="/aac/americanaddictioncenters-com">AAC</Link>{' '}
                <Link to="/facility/deserthopetreatment-com">Facility</Link>{' '}
                <Link to="/library/alcohol-org">Library</Link>{' '}
                <Link to="/directory/rehabs-com">Directory</Link>
            </div>
        </div>
    );
};
