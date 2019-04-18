import React, {Component} from 'react';
import './Site.css';
import Loader from '../loader/loader';
import DashOverview from '../dashOverview/dashOverview';
import DashWidget from '../dashWidget/dashWidget';
import {withRouter} from 'react-router-dom';
import SiteToggle from '../siteToggle/siteToggle';

const Site = class Site extends Component {
    state = {
        isFetching: true,
        error: null,
        templates: []
    };

    async componentDidMount() {
        // get all the templates from mongo
        const path = this.props.location.pathname.replace('-', '.');
        const product = path.split('/').slice(-2)[0];
        const site = path.split('/').slice(-1)[0];
        try {
            let response = await fetch(
                `http://localhost:8080/pagespeed/get-templates/${product}/${site}`
            );
            let data = await response.json();
            this.setState(prevState => ({
                templates: [...prevState.templates, ...data],
                isFetching: false
            }));
        } catch (error) {
            this.setState({
                isFetching: false,
                error
            });
        }
    }

    addTemplate = () => {
        this.setState(prevState => ({
            templates: [
                ...prevState.templates,
                {templateName: '', url: '', index: prevState.templates.length}
            ]
        }));
    };

    removeTemplate = async index => {
        const answer = window.confirm(
            'Are you sure you want to delete this template? Historical data may be lost'
        );
        if (!answer) return;
        console.log(index);
        const id = this.state.templates[index]._id;
        console.log(id);

        if (!id) {
            //this is a temp card not in mongo
            this.setState({
                templates: this.state.templates.filter(template => {
                    return template.index !== index;
                })
            });
            return;
        }
        console.log('temp card shouldnt log this');

        this.setState({
            isFetching: true
        });
        //remove site from state and mongobd
        try {
            let response = await fetch(`http://localhost:8080/pagespeed/delete/${id}`, {
                method: 'DELETE',
                // mode: 'no-cors',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            let data = await response.json();
            this.setState({
                templates: this.state.templates.filter(template => {
                    return template._id !== id;
                }),
                isFetching: false
            });
            alert(data.message);
        } catch (error) {
            this.setState({
                isFetching: false,
                error: error.message
            });
            alert(error.message);
        }
    };

    render() {
        const {error, isFetching, templates} = this.state;
        console.log(templates);
        // if (error) {
        //     return <div>Error: {error.message}</div>;
        // } else
        if (isFetching) {
            return (
                <div className="App">
                    <Loader
                        style={{
                            maxWidth: '150px',
                            maxHeight: '150px',
                            margin: '0 auto',
                            display: 'flex'
                        }}
                    />
                </div>
            );
        } else {
            return (
                <>
                    <SiteToggle />
                    <div className="container">
                        <DashOverview
                            title="Average Site Data"
                            desc="The average of all your tracked site templates"
                            data={templates}
                        />
                        {this.state.templates.map((template, index) => {
                            return (
                                <DashWidget
                                    key={index}
                                    removeTemplate={e => this.removeTemplate(index)}
                                    data={template}
                                    pagespeedIds={template.pagespeedData}
                                />
                            );
                        })}
                        <button className="add-template" onClick={this.addTemplate}>
                            Add a new page to track
                        </button>
                    </div>
                </>
            );
        }
    }
};

export default withRouter(Site);
