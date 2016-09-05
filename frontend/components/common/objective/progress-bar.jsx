import React from 'react';

const Progress = (props) => {
	let keyResults = props.data;
	let score = 0;
	let value = 0;
	console.log('progr', keyResults);
	
	if(keyResults.length !== 0) {
		score = keyResults.reduce((prev, keyResult) => {
			return prev += +keyResult.score;
		}, 0);

		value = Math.round(100 * score / keyResults.length);
	}

	return (
		<div className="progress-bar">
			<progress max="100" value={ value }></progress>
			<div className="progressValue">{ value }%</div>
		</div>
	)
}

export default Progress
