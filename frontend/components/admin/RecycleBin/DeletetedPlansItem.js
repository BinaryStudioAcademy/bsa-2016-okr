import React, { Component } from 'react';
 
class DeletedPlansItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div id={this.props.item.id} className="recycle-bin-item">
			<div className="bin-item-details">
				<div className="item-titele"><span>Title: </span>{this.props.item.title}</div>
				<div className="item-description"><span>Description: </span>{this.props.item.description}</div>
			</div>
			<div className="bin-item-control">
				<button className="item-rapair">Restore</button>
			</div>
		</div>
		);
	}
}

export default DeletedPlansItem