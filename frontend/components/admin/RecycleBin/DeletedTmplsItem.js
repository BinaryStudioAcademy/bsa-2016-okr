import React, { Component } from 'react'
 
class DeletedTmplsItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<tr className="bin-item-row">
				<td className="item-title">{ this.props.item.type }</td>
				<td className="item-category">{ this.props.item.category }</td>
				<td>{ this.props.item.title }</td>
				<td>{ this.props.item.description }</td>
				<td className="item-deleted-by">{ this.props.item.deletedBy.fullName }</td>
				<td>{ this.props.item.deletedDate }</td>
				<td className="controls">
					<button className="btn btn-blue" title="Restore"><i className="fi flaticon-repeat-1"></i></button>
					<button className="btn btn-red" title="Hard delete"><i className="fi flaticon-garbage-2"></i></button>
				</td>
			</tr>
		);
	}
}

export default DeletedTmplsItem