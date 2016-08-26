import React, { Component } from 'react'
import Quarter from './persons-quarter.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

class PersonsInfo extends Component {
	constructor(props){
		super(props);

	}

	render() {
		let apprentice;
		console.log(this.props.localRole)
		if (this.props.localRole == 'mentor' || this.props.localRole == 'admin') {
			apprentice = (<button className="btn btn-blue-hover apprentice" title="apprentice">Take apprentice</button>);
		}
		const {user} = this.props.user
		var mentor = '';
		if(user.mentor == null)
			mentor = 'Is not assigned';
		else mentor = (user.mentor.userInfo.firstName +' '+ user.mentor.userInfo.lastName);
		return (
			<div id='topPanel'>
				<div className='userInfo'>
					{apprentice}
					<div className='logo'>
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
					</div>
					<div className='credentials'>
					{user.userInfo.firstName} {user.userInfo.lastName}
						<div>
							<img src='https://pp.vk.me/c628730/v628730341/2e5d5/GGZg2j32zm4.jpg'/>
							<span className='mentorName'>
								<span className='mentorTitle'>Mentor:</span> 
								<br />{mentor}
							</span>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
	let localRole = state.myState.me.localRole || '';
	return {
		localRole,
		user: state.userPage,
		categories: state.categories
	};
}

const PersonsInfoConnected = connect(mapStateToProps, mapDispatchToProps)(PersonsInfo);
export default PersonsInfoConnected
