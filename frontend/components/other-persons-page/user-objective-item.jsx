import React, { Component } from 'react';
import KeyResults from './key-result.js';
import Progress from './progress-bar.js';

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='objective'>
				<Progress data={this.props.item.keyResults}/>
					<div className='name'>{this.props.item.templateId.title}</div>
					<button className="btn btn-blue-hover clone" title="Clone">Clone to my objectives</button>
					<div className='description'>{this.props.item.templateId.description}</div>
				<KeyResults data={this.props.item.keyResults} />
			</div>
			)
	}
}

export default ObjectiveItem;
