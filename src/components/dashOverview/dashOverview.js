import React, {Component} from 'react';
import Chart from '../chart/Chart';
import Circle from '../circle/circle';
import Loader from '../loader/loader';

class DashOverview extends Component {
    state = {
        isFetching: true,
        error: null,
        data: []
    };

    async componentDidMount() {
        // get all the pagespeeds from mongo
        let {data} = this.props;
        const pagespeedIds = data.reduce((acc, template) => {
            acc.push(template.pagespeedData.join(','));
            return acc;
        }, []);
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
        const {error, isFetching, data} = this.state;
        const scores =
            data && data.map(score => Math.round(score.lighthousePerformanceScore * 100));
        const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
        const averageScore = average(scores);
        if (isFetching) {
            return (
                <div className="dash" style={{display: 'block'}}>
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
        } else
            return (
                <div className="dash">
                    <div className="dash__left">
                        <h2> {this.props.title} </h2>
                        <p
                            style={{
                                color: '#999'
                            }}>
                            {this.props.desc}
                        </p>
                        <Circle value={averageScore || 0} />
                    </div>
                    <div className="dash__right">
                        <Chart />
                    </div>
                </div>
            );
    }
}

export default DashOverview;
