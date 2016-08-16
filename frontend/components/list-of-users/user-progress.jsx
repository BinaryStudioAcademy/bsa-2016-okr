import React, { Component } from 'react';

class UserProgress extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className='progress-bar'>
				<div className='progressTitle'>Current OKR score</div>
				<progress max="100" value='40'></progress>
				<span className='progressValue'>40%</span>
			</div>
		)
	}
}

export default UserProgress