import React, { Component } from 'react';
import KeyResults from './key-result.js';
import Progress from './progress-bar.js';

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);
	}

	
	render() { 
		console.log(this.props.item.keyResults)
		return (
			<div className='objective'>
				<Progress data={this.props.item.keyResults}/>
         		<div className='name'>{this.props.item.objTitle}</div>
         		<span className="plus-icon">
         			<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Very_Basic/plus-25.png" title="Plus" width="25"/>
         		</span>
         		<div className='description'>{this.props.item.objDescription}</div>
		        <div className="objective-info">
		            <div className='co-workers'>
		            	<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Users/group-25.png" title="User Group Man Man" width="25" />4
		        	</div>
		            <div className='followed'>
		            	<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Hands/thumb_up-25.png" title="Thumb Up" width="25" />10
		            </div>
		        </div>
		        <KeyResults data={this.props.item.keyResults} />
		    </div>        
		)
	}
}

export default ObjectiveItem
