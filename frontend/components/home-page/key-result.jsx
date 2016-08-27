import React, { Component } from 'react';

class KeyResult extends Component {
	constructor(props) {
		super(props);

		this.state = {
			score: this.props.item.score
		};

		this.changeScore = this.changeScore.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			score: nextProps.item.score
		});
	}

	changeScore(e) {
		var score = e.target.value;

		this.setState({
			score: score
		});

		this.props.changeScore(score);
	}

	render() {
		const item = this.props.item;
		const score = this.state.score;
		
		return (
			<li className="key-result">
				<div><span className='completed'>{ item.templateId.title }</span></div>
				<input type="range" min="0" max="1" step="0.1" className="range keyScore"
				       value={ score } onChange={ this.changeScore }/>
				<div><span className='score'>{ score }</span></div>
				<div className='difficulty'>{item.templateId.difficulty}</div>
			</li>
		)
	}
}

export default KeyResult
