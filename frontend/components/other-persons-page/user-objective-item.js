import React, { Component } from 'react';
import KeyResult from './key-result';
import Progress from './progress-bar.js';

class ObjectiveItem extends Component {
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
	}

	handleShow() {
		var keyResult = document.getElementsByClassName('key-result-details'),
   			icon = document.getElementsByClassName('change'),
   			i = this.props.index;
	   	if (keyResult[i].classList.contains('undisplay')) {
	    	keyResult[i].classList.remove('undisplay');
	    	keyResult[i].classList.add('display');
	    	icon[i].classList.remove('fa-angle-double-down');
	   		icon[i].classList.add('fa-angle-double-up');
		}
	   	else {
	   		icon[i].classList.remove('fa-angle-double-up');
	   		icon[i].classList.add('fa-angle-double-down');
	    	keyResult[i].classList.remove('display');
	    	keyResult[i].classList.add('undisplay');
	   	}
	}
	render() { 
		var date =  Date.parse(this.props.item.startDate)
			
			var first = Date.parse('2016-12-31T13:51:50.417Z');
			console.log(first);
			if (date > first)
				return (
					<div></div>
					)
			else
		return (
			<div className='objective'>
				<Progress data={this.props.item.keyResults}/>
         		<div className='name'>{this.props.item.objTitle}
         		</div>
         		<span className="plus-icon">
         			<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Very_Basic/plus-25.png" title="Plus" width="25"/>
         		</span>
         		<div className='description'>{this.props.item.objDescription}</div>
		        <div className="objective-info">
		            <div className='co-workers'><img src="https://maxcdn.icons8.com/iOS7/PNG/25/Users/group-25.png" title="User Group Man Man" width="25" />4</div>
		            <div className='followed'><img src="https://maxcdn.icons8.com/iOS7/PNG/25/Hands/thumb_up-25.png" title="Thumb Up" width="25" />10</div>
		        </div>
		        <div className='user-key-results'>Key results
		            <span className="fa fa-angle-double-down fa-lg change" onClick={this.handleShow}></span>
		            <div className='key-result-details undisplay'>
		            	<KeyResult data={this.props.item.keyResults} />
		            </div>
		        </div>
		    </div>        
		)
	}
}

export default ObjectiveItem
