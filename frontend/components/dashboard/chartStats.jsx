import React from 'react';
import {Chart} from 'react-google-charts';

export default class ChartStats extends React.Component {
    constructor(props) {
        super(props);
        this.barOptions = {
            title: this.props.title,
            backgroundColor: 'transparent',
            hAxis: { title: 'Score', format: 'percent', ticks: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
            colors: [this.props.color]
        };
    }

    render() {
        return (
            <div className="my">
                <Chart chartType = "BarChart" data = {this.props.data} options = {this.barOptions} width={"90%"} height={"300px"}  legend_toggle={true} />
            </div>
        )
    }
}