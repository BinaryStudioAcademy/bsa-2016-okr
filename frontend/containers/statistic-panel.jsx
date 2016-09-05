import React from 'react';
import "./statistic-panel.scss";

const StatisticPanel = (props) => {
	return (
		<aside id="inter-panel">
			{ props.children }
		</aside>
	);
}

export default StatisticPanel;