import React, {Component} from 'react';
import ReactChartkick, {LineChart, PieChart} from 'react-chartkick';
import Chart from 'chart.js';
import './chart.css';
import * as moment from 'moment';

ReactChartkick.addAdapter(Chart);

class Graph extends Component {
    state = {
        graphTimeDuration: 'all'
    };

    updateGraph = duration => {
        this.setState({graphTimeDuration: duration});
    };

    render() {
        if (!this.props.data) return null;
        const {graphTimeDuration} = this.state;

        const getNumDaysBetween = function(d1, d2) {
            var diff = Math.abs(d1.getTime() - d2.getTime());
            return diff / (1000 * 60 * 60 * 24);
        };

        let data = this.props.data.reduce((acc, cur) => {
            const currentDate = new Date();
            const pagespeedDate = new Date(cur.date);
            const numDaysBetween = getNumDaysBetween(pagespeedDate, currentDate);
            const niceDate = cur.date.split('T')[0];

            if (graphTimeDuration === 'week' && numDaysBetween > 7) {
                return acc;
            } else if (graphTimeDuration === 'month' && numDaysBetween > 30) {
                return acc;
            } else {
                acc[niceDate] = Math.round(cur.lighthousePerformanceScore * 100);
                return acc;
            }
        }, {});

        return (
            <>
                <div style={{marginBottom: '30px'}}>
                    <button
                        onClick={() => this.updateGraph('week')}
                        className={graphTimeDuration === 'week' ? 'active' : ''}>
                        1 Week
                    </button>
                    <button
                        onClick={() => this.updateGraph('month')}
                        className={graphTimeDuration === 'month' ? 'active' : ''}>
                        1 Month
                    </button>
                    <button
                        onClick={() => this.updateGraph('all')}
                        className={graphTimeDuration === 'all' ? 'active' : ''}>
                        All Time
                    </button>
                </div>
                <LineChart
                    messages={{empty: 'No data'}}
                    xtitle="Date"
                    ytitle="PageSpeed Score"
                    responsive="true"
                    data={data}
                />
            </>
        );
    }
}

export default Graph;
