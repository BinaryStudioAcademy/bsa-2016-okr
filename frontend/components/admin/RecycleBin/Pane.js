import React, { Component } from 'react';

class Pane extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="recycle-bin-items">
				{ this.props.children }
			</div>
		);
	}
}

export default Pane