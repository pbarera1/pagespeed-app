import React, {Component} from 'react';

export default props => {
    const path =
        props.location.pathname && props.location.pathname !== '/'
            ? `${props.location.pathname.split('/')[1]} Dashboard`
            : 'Welcome to the Pagespeed Tracking App';
    return (
        <h1 style={{textAlign: 'center', textTransform: 'capitalize', color: '#fff'}}>
            {path.includes('aac') ? 'AAC Dashboard' : path}
        </h1>
    );
};
