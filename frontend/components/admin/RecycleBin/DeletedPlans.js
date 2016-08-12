import React, { Component } from 'react'
import binItems from '../../mockData/recycleBin'
import DeletedPlansItem from './DeletedPlansItem'

class DeletedPlans extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(binItems)
		let items = binItems.plans.map((item) => {
			return <DeletedPlansItem item={item} key={item.id} />
		})
		return (
		<div className="deleted-items">
			{ items }
		</div>
		);
	}
}

export default DeletedPlans