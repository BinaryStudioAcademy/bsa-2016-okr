import React, { Component } from 'react';
import { Link } from 'react-router';
import { ROOT_URL } from '../../../../backend/config/constants';

import './user-info-popup.scss';

class UserInfoPopup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var mentor = '';
		let photo;
		if(!this.props.user.userMentor) {
			mentor = (<div>Is not assigned</div>)
			photo = (<i className='fi flaticon-user-3 mentor'></i>);
		} else {
			mentor = (<div>{this.props.user.mentorName}</div>)
			photo = (<img src='https://pp.vk.me/c628730/v628730341/2e5d5/GGZg2j32zm4.jpg'/>);
		}
		let usersInfo = this.props.user.userName + ' (' + this.props.user.userGlobalRole + ')';
		return (
			<Link to={`${ROOT_URL}/user/${this.props.user.userId}`}>
				<div className="hint">
					<div className='userItem'>
						<img className="user-photo" src='https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg'/>
						<div className='users-info'>
							<div className='userName'>{usersInfo}</div>
							<div>{ photo }
								<div className='mentor-name'>
									<div className='mentor-title'>Mentor:</div>
									{mentor}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		)
	}
}

export default UserInfoPopup
