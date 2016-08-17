import React, { Component } from 'react';
import UserProgress from './user-progress.jsx'
import { Link } from 'react-router';

class UserItem extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Link to={`/user/${this.props.user.userId}`}>
				<div className="userItemDiv">
					<li className='userItem'>
						<img src='https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg'/>
						<div className='userInfo'>
							<div className='userName'>{this.props.user.userName}</div>
							<div><span className='fi flaticon-user-6 mentor'></span>
								<span className='mentorName'>
									<span className='mentorTitle'>Mentor:</span> 
									<br /> {this.props.user.mentor}
								</span>
							</div>
						</div>
						<UserProgress />
					</li>
				</div>
			</Link>
		)
	}
}

export default UserItem
