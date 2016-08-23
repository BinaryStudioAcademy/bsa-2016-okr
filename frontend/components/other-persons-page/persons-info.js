import React, { Component } from 'react'
import Quarter from './persons-quarter.js'

class PersonsInfo extends Component {
	render() {
		var mentor = '';
		if(this.props.data.mentor == null)
			mentor = 'Is not assigned';
		else mentor = (this.props.data.mentor.userInfo.firstName +' '+ this.props.data.mentor.userInfo.lastName)
		return (
			<div id='topPanel'>
				<div className='userInfo'>
				<button className="btn btn-blue-hover apprentice" title="apprentice">Take apprentice</button>
					<div className='logo'>
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
					</div>
					<div className='credentials'>
						<div>
							<img src='https://pp.vk.me/c628730/v628730341/2e5d5/GGZg2j32zm4.jpg'/>
							<span className='mentorName'>
								<span className='mentorTitle'>Mentor:</span> 
								<br />{mentor}
							</span>
						</div>
					{this.props.data.userInfo.firstName} {this.props.data.userInfo.lastName}
					</div>
				</div>
			</div>
		)
	}
}

export default PersonsInfo