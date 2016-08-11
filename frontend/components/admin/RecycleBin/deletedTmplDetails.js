import React, { Component } from 'react';

class DeletedTmplsDetails extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className="recycle-bin-item-details">
			<div className="bin-item-details">
				<h2>Details for</h2>
				{ this.props.params.id }
			</div>
			<div className="bin-item-control">
				<button className="item-rapair">Restore</button>
			</div>
		</div>
		);
	}
}

export default DeletedTmplsDetails