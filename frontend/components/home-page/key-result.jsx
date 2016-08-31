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
		this.handleDelKeyResult = this.handleDelKeyResult.bind(this);
	}

	handleDelKeyResult() {
		var confirmed = confirm("Do you really want to delete this key result?");

		if (confirmed) {
			this.props.softDeleteObjectiveKeyResultByIdApi(this.props.item._id);
		}
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
				<div className='completed key-result-title'>{ item.templateId.title }</div>
				<input type="range" min="0" max="1" step="0.1" className="range keyScore"
				       value={ score } onMouseUp={ this.changeScore } onChange={ this.onChange }/>
				<div><span className='score'>{ score }</span></div>
				<div className='difficulty'>{item.templateId.difficulty}</div>

				<button
					type="button"
					className="btn btn-red-hover key-result-delete-button"
				  onClick={ this.handleDelKeyResult }>
					<i className="fi flaticon-garbage-2" aria-hidden="true"></i>
				</button>

			</li>
		)
	}
}

export default KeyResult
