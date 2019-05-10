import React, {Component} from 'react';
import './formSave.css';
import {withRouter} from 'react-router-dom';

class InputSave extends Component {
    state = {
        templateName: this.props.data.templateName || '',
        pageUrl: this.props.data.pageUrl || '',
        id: this.props.data._id || '',
        message: '',
        error: '',
        isInDatabase: this.props.data.pageUrl
    };

    handleChange1 = event => {
        this.setState({templateName: event.target.value});
    };

    handleChange2 = event => {
        this.setState({pageUrl: event.target.value});
    };

    handleSubmit = async e => {
        const {templateName, pageUrl} = this.state;
        const path = this.props.location.pathname.replace('-', '.');
        const site = path.split('/').slice(-1)[0];
        const product = path.split('/').slice(-2)[0];
        const date = Date.now();
        let templateData = {templateName, pageUrl, product, site, date};

        // save to mongo
        try {
            let response = await fetch('/pagespeed/create-template', {
                method: 'POST',
                // mode: 'no-cors',
                body: JSON.stringify(templateData),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            let data = await response.json();
            this.setState({
                isFetching: false,
                message: data.message
            });
        } catch (error) {
            this.setState({
                isFetching: false,
                error: error.message
            });
        }
    };

    render() {
        const {isInDatabase} = this.state;
        const inputHasValue = this.state.templateName || this.state.pageUrl;
        const message = this.state.error || this.state.message;
        return (
            <>
                <form>
                    <div
                        onClick={this.clicked}
                        style={{
                            marginRight: '20px',
                            textAlign: 'right',
                            flexBasis: '100px'
                        }}>
                        Template Name:
                    </div>
                    <input
                        type="search"
                        placeholder="Enter Template Name"
                        value={this.state.templateName}
                        onChange={this.handleChange1}
                        readOnly={isInDatabase}
                    />
                    <div
                        style={{
                            marginRight: '20px',
                            textAlign: 'right',
                            flexBasis: '100px'
                        }}>
                        Page URL:
                    </div>
                    <input
                        type="search"
                        placeholder="Enter URL"
                        value={this.state.pageUrl}
                        onChange={this.handleChange2}
                        readOnly={isInDatabase}
                    />
                    {!isInDatabase && (
                        <button
                            className="input-save__btn"
                            type="button"
                            disabled={!inputHasValue}
                            onClick={this.handleSubmit}>
                            Save
                        </button>
                    )}

                    {message && (
                        <div
                            className="api-message"
                            style={{color: `${this.state.error ? 'red' : 'green'}`}}>
                            {message}
                        </div>
                    )}
                </form>
            </>
        );
    }
}

export default withRouter(InputSave);
