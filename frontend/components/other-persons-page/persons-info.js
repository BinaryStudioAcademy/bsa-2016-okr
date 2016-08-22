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
					<div className='logo'>
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
					</div>
					<div className='credentials'>
						<div>
							<span className='fi flaticon-user-6 mentor'></span>
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