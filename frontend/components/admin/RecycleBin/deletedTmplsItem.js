import React, { Component } from 'react'
import { Link } from 'react-router'

class DeletedTmplsItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div id={this.props.item.id} className="recycle-bin-item">
			<div className="bin-item-details">
				<div className="item-titele"><Link to={'/deleted-tmpls/' + this.props.item.id}><span>Title: </span>{this.props.item.title}</Link></div>
				<div className="item-category"><span>Category: </span>{this.props.item.category}</div>
				<div className="item-kr-count"><span>Amount of KR: </span>{this.props.item.keyResults.length}</div>
			</div>
			<div className="bin-item-control">
				<button className="item-rapair">Restore</button>
			</div>
		</div>
		);
	}
}

export default DeletedTmplsItem