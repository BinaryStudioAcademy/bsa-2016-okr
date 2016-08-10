import React, { Component } from 'react'
import binItems from '../../mockData/recycleBin'

class DeletedPlans extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className="deleted-items">
			<h2>Deleted Plans</h2>

		</div>
		);
	}
}

export default DeletedPlans