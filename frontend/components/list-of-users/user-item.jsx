import React, { Component } from 'react';
import UserProgress from './user-progress.jsx'
import { Link } from 'react-router';

class UserItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var mentor = '';
		let photo;
		if(this.props.user.userId.mentor == null) {
			mentor = 'Is not assigned';
			photo = (<i className='fi flaticon-user-3'></i>);
		} else {
			mentor = (this.props.user.userId.mentor.userInfo.firstName +' '+ this.props.user.userId.mentor.userInfo.lastName)
			photo = (<img src='https://pp.vk.me/c628730/v628730341/2e5d5/GGZg2j32zm4.jpg'/>);
		}
		return (
			<Link to={`user/${this.props.user.userId._id}`}>
				<div className="userItemDiv">
					<li className='userItem'>
						<img src='https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg'/>
						<div className='userInfo'>
							<div className='userName'>{this.props.user.userId.userInfo.firstName} {this.props.user.userId.userInfo.lastName}</div>
							<div>{ photo }
								<span className='mentorName'>
									<span className='mentorTitle'>Mentor:</span>
									<br /> {mentor}
								</span>
							</div>
						</div>
						<UserProgress ref="progress" userProgress={this.props.user.userProgress}/>
					</li>
				</div>
			</Link>
		)
	}
}

export default UserItem
