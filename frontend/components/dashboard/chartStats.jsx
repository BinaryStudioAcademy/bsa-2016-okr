import React from 'react';
import {Chart} from 'react-google-charts';

export default class ChartStats extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="my">
                <Chart chartType = "PieChart" data = {this.props.data} options = {{ "title": this.props.title, "backgroundColor": "#ddd", "is3D": true}} width={"120%"} height={"400px"}  legend_toggle={true} />
            </div>
        )
    }

}