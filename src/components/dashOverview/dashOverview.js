import React, {Component} from 'react';
import Chart from '../chart/Chart';
import Circle from '../circle/circle';
import Loader from '../loader/loader';

const DashOverview = props => {
    const data = props.pagespeedData;
    const scores =
        data && data.map(score => Math.round(score.lighthousePerformanceScore * 100));
    const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;
    const averageScore = Math.round(average(scores));

    return (
        <div className="dash">
            <div className="dash__left">
                <h2> {props.title} </h2>
                <p
                    style={{
                        color: '#999'
                    }}>
                    {props.desc}
                </p>
                <Circle value={averageScore || 0} />
            </div>
            <div className="dash__right">
                <Chart data={data} />
            </div>
        </div>
    );
};

export default DashOverview;
