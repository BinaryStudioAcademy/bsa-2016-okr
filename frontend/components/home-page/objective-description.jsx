import React, { Component } from 'react';

class ObjectiveDescription extends Component {

	render() {
    if(!!this.props.description && this.props.description.length != 0) {
       return <div ref='description' className='description'>{ this.props.description }</div>
    }
		return <div ref='description' className='description'>Please add description</div>
	}
}

export default ObjectiveDescription
