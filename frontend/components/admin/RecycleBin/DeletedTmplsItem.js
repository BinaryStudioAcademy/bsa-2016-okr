import React, { Component } from 'react'
 import moment from 'moment';

class DeletedTmplsItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let dateStr = moment(this.props.item.deletedDate).format('D MMMM YYYY, h:mm a');
		
		return (
			<tr className="bin-item-row">
				<td className="item-title">{ this.props.item.type }</td>
				<td className="item-category">{ this.props.item.category }</td>
				<td>{ this.props.item.title }</td>
				<td>{ this.props.item.description }</td>
				<td className="item-deleted-by">{ this.props.item.deletedBy.fullName }</td>
				<td>{ dateStr }</td>
				<td>
					<table className="controls">
					    <tbody>
							<tr>
								<td><button className="btn btn-blue-hover" title="Restore"><i className="fi flaticon-repeat-1"></i></button></td>
								<td><button className="btn btn-red-hover" title="Hard delete"><i className="fi flaticon-garbage-2"></i></button></td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		);
	}
}

export default DeletedTmplsItem