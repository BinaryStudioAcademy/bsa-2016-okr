import React, { Component } from 'react';
import { getDifficultyNumber, getNumberDifficulty } from '../../../../backend/utils/HelpService';
import './rating.scss';

class Rating extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rating: getDifficultyNumber(this.props.rating) || null,
			temp_rating: null
		};

		this.onClick = this.onClick.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		/*this.onMouseOut = this.onMouseOut.bind(this);*/

	}

	onClick(rating) {
		return () => {
			if (this.props.isEdit) {
				this.setState({
					rating: rating,
					temp_rating: rating
				});
			}
		}
	}

	onMouseOver(rating) {
		return () => {
			if (this.props.isEdit) {
				this.state.temp_rating = this.state.rating;
				this.state.rating = rating;

				this.setState({
					rating: this.state.rating,
					temp_rating: this.state.temp_rating,
				});
			}
		}
	}

	// If we need return value after mouse move out component
	/*onMouseOut() {
		this.setState({
			rating: this.state.rating//getDifficultyNumber(this.props.rating) || null,
		});
	}*/
 /*onMouseOut={this.onMouseOut}*/
	render() {

		var stars = [];

		for (var i = 1; i <= 3; i++) {
			var klass = 'star-rating__star';

			if (this.state.rating >= i && this.state.rating != null) {
				klass += ' is-selected';
			}

			stars.push(
				<label
					className={klass}
					onClick={this.onClick(i)}
					onMouseOver={this.onMouseOver(i)}
				  title = { `${getNumberDifficulty(this.state.rating)}` }
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