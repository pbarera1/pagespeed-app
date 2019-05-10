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
        templates: [],
        pagespeedData: [],
        currentPage: null
    };

    async componentDidMount() {
        // get all the templates from mongo
        const path = this.props.location.pathname.replace('-', '.');
        const product = path.split('/').slice(-2)[0];
        const site = path.split('/').slice(-1)[0];
        console.log(site);
        try {
            let response1 = await fetch(`/pagespeed/get-templates/${product}/${site}`);
            let response2 = await fetch(`/pagespeed/get-pagespeeds/${site}`);
            let data = await response1.json();
            let pagespeedData = await response2.json();
            console.log(pagespeedData);
            this.setState(prevState => ({
                templates: [...prevState.templates, ...data],
                pagespeedData,
                isFetching: false
            }));
        } catch (error) {
            this.setState({
                isFetching: false,
                error
            });
        }
    }

    updatePage = (path = '/') => {
        this.setState({currentPage: path});
    };

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
            let response = await fetch(`/pagespeed/delete/${id}`, {
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
        const {error, isFetching, templates, pagespeedData} = this.state;
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
                    <SiteToggle callback={this.updatePage} />
                    <div className="container">
                        <DashOverview
                            title="Average Site Data"
                            desc="The average of all your tracked site templates"
                            pagespeedData={pagespeedData}
                        />
                        {this.state.templates.map((template, index) => {
                            return (
                                <DashWidget
                                    key={index}
                                    removeTemplate={e => this.removeTemplate(index)}
                                    template={template}
                                    pagespeedData={pagespeedData}
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
