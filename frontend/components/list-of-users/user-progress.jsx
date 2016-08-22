import React, { Component } from 'react';

class UserProgress extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		var sum = 0,
			count = 0,
			progress = 0;
		let score = this.props.userObjectives.forEach((objective) => {
			let kr = objective.keyResults.forEach((item) => {
				sum = item.score + sum;
				count++;
			})
		})
		if(count == 0)
			progress = 0;
		else
			progress = Math.round(100*sum/count);
		return (
			<div className='progress-bar'>
				<div className='progressTitle'>Current OKR score</div>
				<progress max="100" value={progress}></progress>
				<span className='progressValue'>{progress}%</span>
			</div>
		)
	}
}

export default UserProgress