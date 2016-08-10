import React, { Component } from 'react'
import binItems from '../../mockData/recycleBin.js'

class DeletedTmps extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		// console.log(binItems.templates);
		return (
		<div className="deleted-items">
			<h2>Deleted tmps</h2>
		</div>
		);
	}
}

export default DeletedTmps