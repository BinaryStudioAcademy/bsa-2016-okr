import React, { Component } from 'react';
import { Link } from 'react-router';
import './style.scss'

class RecycleBin extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div id="recycle-bin">
			<div id="recycle-bin-header">
				<h2>Recycle bin 2</h2>
				<Link to="deleted-tmpls">Templates</Link>
				<Link to="deleted-plans">Plans</Link>
			</div>
			<div id="recycle-bin-container">
				{this.props.children}
			</div>
		</div>
		);
	}
}

export default RecycleBin