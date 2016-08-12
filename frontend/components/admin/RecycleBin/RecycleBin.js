import React, { Component } from 'react'
import TabLink from './tabLink.js'
import './recycleBin.scss'

class RecycleBin extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className="recycle-page">
			<div className="header">
				<h2 className="title">Recycle</h2>
				<div className="recycle-tabs">
					<TabLink to="deleted-tmpls">Templates</TabLink>
					<TabLink to="deleted-plans">Plans</TabLink>
				</div>
			</div>
			<div id="recycle-bin-container">
				{this.props.children}
			</div>
		</div>
		);
	}
}

export default RecycleBin