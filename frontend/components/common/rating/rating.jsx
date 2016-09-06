import React, { Component } from 'react';
import './rating.scss';

class Rating extends Component {
	constructor(props) {
		super(props);

		this.state = {
			rating: this.props.rating || null,
			temp_rating: null
		};

		this.onClick = this.onClick.bind(this);
		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);

	}

	onClick(rating) {
		return () => {
			this.setState({
				rating: rating,
				temp_rating: rating
			});
		}
	}

	onMouseOver(rating) {
		return () => {
			this.state.temp_rating = this.state.rating;
			this.state.rating = rating;

			this.setState({
				rating: this.state.rating,
				temp_rating: this.state.temp_rating
			});
		}
	}

	onMouseOut() {
		this.setState({
			rating: this.props.rating || null
		});
	}

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
					onMouseOut={this.onMouseOut}
				>
					●
				</label>
			);

		}

		return (
			<div className="star-rating">
				{stars}
				<div className="star-rating-cover">
					<i className={`fi-1 flaticon-1-weightlifter-${this.state.rating}`} aria-hidden="true"></i>
				</div>
			</div>
		)
	}
}

export default Rating