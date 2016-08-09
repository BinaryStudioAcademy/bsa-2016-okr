import React, { Component } from 'react';
import KeyResult from './key-result';

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
		return (
			<div className='objective'>
			<div className='progress-bar'>
		            	<progress max="100" value='25'></progress>
		       	</div>
         		<div className='name'>{this.props.item.objTitle}
         		</div>
         		<span className="plus-icon">
         			<img src="https://maxcdn.icons8.com/iOS7/PNG/25/Very_Basic/plus-25.png" title="Plus" width="25"/>
         		</span>
         		<div className='description'>{this.props.item.objDescription}</div>
		        <div className="objective-info">
		            <div className='co-workers'><span className="fa fa-users"></span>4</div>
		            <div className='co-workers'><span  className="fa fa-thumbs-up"></span>10</div>
		        </div>
		        <div className='user-key-results' onClick={this.handleShow}>Key results
		            <span className="fa fa-angle-double-down fa-lg change"></span>
		            <div className='key-result-details undisplay'>
		            	<KeyResult data={this.props.item.keyResults} />
		            </div>
		        </div>
		    </div>        
		)
	}
}

export default ObjectiveItem
