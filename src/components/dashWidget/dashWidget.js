import React, {Component} from 'react';
import Chart from '../chart/Chart';
import TemplateSave from '../inputSave/inputSave';
import Circle from '../circle/circle';
import Loader from '../loader/loader';

class DashWidget extends Component {
    state = {
        isFetching: true,
        error: null,
        templates: [],
        data: []
    };

    async componentDidMount() {
        // get all the pagespeeds from mongo
        const pagespeedIds = this.props.pagespeedIds || [];
        const pageSpeedIdList = pagespeedIds.join(',');
        try {
            let response = await fetch(
                `http://localhost:8080/pagespeed/get-pagespeeds/${pageSpeedIdList}`
            );
            let data = await response.json();
            this.setState({
                data,
                isFetching: false
            });
        } catch (error) {
            this.setState({
                isFetching: false,
                error
            });
        }
    }

    render() {
        const {error, isFetching, data, templates} = this.state;
        const scores = data.map(item => {
            Math.round(item.lighthousePerformanceScore * 100);
        });
        const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
        const averageScore = average(scores);
        console.log(data);
        if (isFetching) {
            return (
                <div className="site">
                    <Loader
                        color="green"
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
                <div className="site">
                    <div className="site__close" onClick={this.props.removeTemplate}>
                        ✕
                    </div>
                    <div>
                        <TemplateSave
                            data={this.props.data}
                            placeholder="Enter Template Name"
                            label="Template Name:"
                        />
                    </div>
                    <div>
                        <div className="site__heading"> Results from date </div>
                        {averageScore && <Circle value={averageScore} />}
                    </div>
                    <div>
                        <div className="site__heading"> Historical View </div>
                        <Chart />
                    </div>
                </div>
            );
        }
    }
}

export default DashWidget;
