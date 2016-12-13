import React, { Component } from 'react';
import { Chart } from 'react-google-charts';
import { isEmpty } from '../../../backend/utils/ValidateService';

class ChartStats extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.chartEvents = [
			{
				eventName: 'ready',
				callback: (Chart) => {
				}
			}
		];
	}

	render() {
		const barOptions = {
			title: this.props.title,
			backgroundColor: 'transparent',
			hAxis: { title: 'Score', format: 'percent', ticks: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
			colors: [this.props.color],
		};

		let ChartEl = (<div></div>);

		if(!isEmpty(this.props.data)) {
			ChartEl = (
				<Chart chartType="BarChart" 
					data={ this.props.data } 
					options={ barOptions }
					width={ '90%' } 
					height={ '300px' } 
					legend_toggle={ true }
					chartEvents={ this.chartEvents }
				/>
			);
		}

		let chartId = this.props.title.replace(/\s/g, '-');

		return (
			<div id={ chartId } className="my">
				{ ChartEl }
			</div>
		);
	}
}

export default ChartStats;