import React, { Component } from 'react'
 
class DeletedTmplsItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let dateObj = new Date(this.props.item.deletedDate);
		let date = dateObj.getDate();
		let month = dateObj.getMonth();
		let year = dateObj.getFullYear();
		let hours = dateObj.getHours();
		let minutes = dateObj.getMinutes();
		let dateStr = `${date}-${month}-${year} ${hours}:${minutes}`;
		
		return (
			<tr className="bin-item-row">
				<td className="item-title">{ this.props.item.type }</td>
				<td className="item-category">{ this.props.item.category }</td>
				<td>{ this.props.item.title }</td>
				<td>{ this.props.item.description }</td>
				<td className="item-deleted-by">{ this.props.item.deletedBy.fullName }</td>
				<td>{ dateStr }</td>
				<td className="controls">
					<button className="btn btn-blue-hover" title="Restore"><i className="fi flaticon-repeat-1"></i></button>
					<button className="btn btn-red-hover" title="Hard delete"><i className="fi flaticon-garbage-2"></i></button>
				</td>
			</tr>
		);
	}
}

export default DeletedTmplsItem