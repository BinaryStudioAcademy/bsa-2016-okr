import React, { Component } from 'react'
import binItems from '../../mockData/data_for_recycle_bin'
import DeletedTmplsItem from './DeletedTmplsItem'

class DeletedTmpls extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let items = binItems.templates.map((item) => {
			return <DeletedTmplsItem item={item} key={item.id} />
		})
		return (
		<div className="deleted-items">
			{ items }
		</div>
		);
	}
}

export default DeletedTmpls