import React, { Component } from 'react';

class Progress extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		var score = 0;
		let item = this.props.data.forEach((item, index) => {
			score += +item.score;
		})
		var value = Math.round(100*score/this.props.data.length);

		return (
			<div className='progress-bar'>
				<progress max="100" value={value}></progress>
				<span className='progressValue'>{value}%</span>
			</div>
		)
	}
}

export default Progress