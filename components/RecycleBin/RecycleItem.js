import React, { Component } from 'react';

class RecycleItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div id={this.props.item.id} className="recycle-bin-item">
			<div className="bin-item-details">
				<div className="item-titele"><span>Title: </span>{this.props.item.objTitle}</div>
				<div className="item-category"><span>Category: </span>{this.props.item.category}</div>
				<div className="item-kr-count"><span>Amount of KR: </span>{this.props.item.keyResults.length}</div>
				<div className="item-owner"><span>Owner: </span>{this.props.item.ownerName}</div>
				<div className="item-start"><span>Start Date: </span>{this.props.item.startDate}</div>
				<div className="item-deleted"><span>Deleted Date: </span>{this.props.item.deleteDate}</div>
			</div>
			<div className="bin-item-control">
				<button className="item-rapair">Restore</button>
			</div>
		</div>
		);
	}
}

export default RecycleItem