import React, {Component} from 'react';
import Chart from '../chart/Chart';
import TemplateSave from '../inputSave/inputSave';
import Circle from '../circle/circle';
import Loader from '../loader/loader';
import * as moment from 'moment';

const DashWidget = props => {
    let data = props.pagespeedData;
    data = data.filter(item => item.pageUrl === props.template.pageUrl);
    let score = '';
    let date = '';
    let formattedDate = '';
    if (props.template.pageUrl && data.length) {
        score = Math.round(data[data.length - 1].lighthousePerformanceScore * 100);
        date = data[data.length - 1].date;
        formattedDate = moment(date).format('MM/DD/YYYY');
    }

    return (
        <div className="site">
            <div className="site__close" onClick={props.removeTemplate}>
                ✕
            </div>
            <div>
                <TemplateSave
                    data={props.template}
                    placeholder="Enter Template Name"
                    label="Template Name:"
                />
            </div>
            <div>
                <div className="site__heading">Results from: {formattedDate}</div>
                {score && <Circle value={score} />}
            </div>
            <div>
                <div className="site__heading"> Historical View </div>
                <Chart data={data} />
            </div>
        </div>
    );
};

export default DashWidget;
