import React, {Component} from 'react';
import ReactChartkick, {LineChart, PieChart} from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

export default props => {
    return (
        <>
            <div style={{marginBottom: '30px'}}>
                <button>1 Week</button>
                <button>1 Month</button>
                <button>All Time</button>
            </div>
            <LineChart
                messages={{empty: 'No data'}}
                xtitle="Date"
                ytitle="PageSpeed Score"
                responsive="true"
                data={{'2017-01-01': 11, '2017-01-02': 6, '2017-01-03': 9}}
            />
        </>
    );
};
