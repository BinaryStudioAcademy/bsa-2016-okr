import React, { Component } from 'react';

class UserProgress extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		/*
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
*/
		return (
			<div className='progress-bar'>
				<div className='progressTitle'>Current OKR score</div>
				<progress max="100" ref="progress" value={this.props.userProgress}></progress>
				<span className='progressValue'>{this.props.userProgress}%</span>
			</div>
		)
	}
}

export default UserProgress
