import React, { Component } from 'react';
import { debounce } from '../../../backend/utils/HelpService';

class KeyResult extends Component {
	constructor(props) {
		super(props);

		this.state = {
			score: this.props.item.score
		};

		this.changeScore = debounce(this.changeScore.bind(this), 500);
		this.onChange = this.onChange.bind(this);
	}

	changeScore() {
		this.props.changeScore(this.state.score);
	}

	onChange(e) {
		var score = e.target.value;

		this.setState({
			score: score
		});
	}

	render() {
		const item = this.props.item;
		const score = this.state.score;
		
		return (
			<li className="key-result">
				<div><span className='completed'>{ item.templateId.title }</span></div>
				<input type="range" min="0" max="1" step="0.1" className="range keyScore"
				       value={ score } onMouseUp={ this.changeScore } onChange={ this.onChange }/>
				<div><span className='score'>{ score }</span></div>
				<div className='difficulty'>{item.templateId.difficulty}</div>
			</li>
		)
	}
}

export default KeyResult
