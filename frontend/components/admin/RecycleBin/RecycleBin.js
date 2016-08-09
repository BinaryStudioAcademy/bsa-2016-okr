import React, { Component } from 'react';
import './style.scss';
import RecycleItem from './RecycleItem.js'
import response from '../../mockData/recycleBin.js';

class RecycleBin extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let recycleItems = this.props.items.map((item) => {
			return <RecycleItem key={item.id} item={item} />
		})
		return (
		<div id="recycle-bin">
			<div id="recycle-bin-header">
				<h2>Recycle bin</h2>
			</div>
			<div id="recycle-bin-container">
				{recycleItems}
			</div>
		</div>
		);
	}
}

RecycleBin.defaultProps = {
	items: response
}

RecycleBin.propTypes = {
	items: React.PropTypes.array
};

export default RecycleBin