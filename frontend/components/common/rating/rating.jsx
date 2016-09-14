import React, { Component } from 'react';
import { getDifficultyNumber, getNumberDifficulty } from '../../../../backend/utils/HelpService';
import './rating.scss';

class Rating extends Component {
	constructor(props) {
		super(props);

		this.onMouseOver = this.onMouseOver.bind(this);
	}

	onMouseOver(rating) {
		return () => {
			if (this.props.isEdit) {
				this.props.setRating(rating);
			}
		}
	}

	render() {
		var stars = [];
		for (var i = 1; i <= 3; i++) {

			var klass = 'star-rating__star';
			if (this.props.rating >= i && this.props.rating != null) {
				klass += ' is-selected';
			}

			stars.push(
					<label
						key={i}
						className={klass}
						onMouseOver={this.onMouseOver(i)}
				    title = { `${getNumberDifficulty(this.props.rating)}` }
				>
					●
				</label>
			);
		}

		return (
			<div className="star-rating">
				<div className='difficulty-label'>Difficulty: </div>
				{ stars }
			</div>
		)
	}
}

export default Rating
