import React, { Component } from 'react';

class Progress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data
		}
	}

	
	render() {
		var score = 0;
		let item = this.state.data.forEach((item, index) => {
			score += +item.score;
		})
		var value = Math.round(100*score/this.state.data.length);

		return (
			<div className='progress-bar'>
		    	<progress max="100" value={value}></progress>
		    	<div className='progressValue'>{value}%</div>
		    </div>
         		       
		)
	}
}

export default Progress