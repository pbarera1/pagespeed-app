import React, {Component} from 'react';
import './siteToggle.css';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

const siteToggle = props => {
    const path = props.location.pathname;
    const product = path.split('/').slice(-2)[0];
    const siteText = path.split('/').slice(-1)[0];
    const getSites = () => {
        const sites = {
            aac: ['americanaddictioncenters.org'],
            facility: [
                'deserthopetreatment.com',
                'lagunatreatment.com',
                'oxfordtreatment.com',
                'greenhousetreatment.com',
                'sunrisehouse.com',
                'recoveryfirst.org',
                'riveroakstreatment.com'
            ],
            directory: [
                'rehabs.com',
                'recovery.org',
                'drugabuse.com',
                'detox.net',
                'projectknow.com'
            ],
            library: [
                'alcohol.org',
                'heroin.net',
                'drugtreatment.com',
                'centers.org',
                'withdrawal.net',
                'addiction-treatment.com',
                'treatment4addiction.com',
                'treatmentsolutions.com',
                'addictionculture.com',
                'mentalhelp.net',
                'psychguides.com'
            ]
        };
        return sites[product];
    };

    return (
        <ul>
            {getSites().map((site, index) => {
                const url = `/${product}/${site.replace('.', '-')}`;
                const isActive = site === siteText.replace('-', '.') ? true : false;
                return (
                    <li key={index}>
                        <Link
                            className={isActive ? 'active' : ''}
                            to={url}
                            onClick={() => props.updatePage(url)}>
                            {site}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default withRouter(siteToggle);
