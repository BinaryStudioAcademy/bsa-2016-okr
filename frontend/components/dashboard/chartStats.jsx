import React from 'react';
import { Chart } from 'react-google-charts';

const ChartStats = (props) => {
	const barOptions = {
		title: props.title,
		backgroundColor: 'transparent',
		hAxis: { title: 'Score', format: 'percent', ticks: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] },
		colors: [props.color],
	};

	return (
		<div className="my">
			<Chart chartType="BarChart" 
				data={ props.data } 
				options={ barOptions } 
				width={ '90%' } 
				height={ '300px' } 
				legend_toggle={ true } 
			/>
		</div>
	);
}

export default ChartStats;