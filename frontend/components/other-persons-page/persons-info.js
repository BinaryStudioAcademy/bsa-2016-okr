import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetalert from 'sweetalert';
import '../common/styles/sweetalert.css';
import { Link } from 'react-router';

import * as actions from "../../actions/otherPersonActions.js";

class PersonsInfo extends Component {
	constructor(props){
		super(props);
		this.takeApprentice = this.takeApprentice.bind(this);
		this.removeApprentice = this.removeApprentice.bind(this);
		this.isMentorOrAdmin = this.isMentorOrAdmin.bind(this);
		this.userHasMentor = this.userHasMentor.bind(this);
		this.isPersonsMentor = this.isPersonsMentor.bind(this);
		this.showBacklog = this.showBacklog.bind(this);
	}

	takeApprentice() {
		let handler = function() {
		this.props.takeApprentice(this.props.user.user._id, this.props.me);
		}.bind(this);

		sweetalert({
			title: "Are you sure?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "Yes",
			cancelButtonText:	"No",
			closeOnConfirm: true
		}, function(){handler();});
	}

	removeApprentice() {
		let handler = function() {
		this.props.removeApprentice(this.props.user.user._id);
		}.bind(this);

		sweetalert({
			title: "Are you sure?",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#4caf50",
			confirmButtonText: "Yes",
			cancelButtonText:	"No",
			closeOnConfirm: true
		}, function(){handler();});
	}

	isPersonsMentor() {
		return this.userHasMentor() && (this.props.user.user.mentor._id == this.props.me._id);		
	}

	isMentorOrAdmin() {
		return (this.props.me.localRole == 'mentor' || this.props.me.localRole == 'admin');
	}

	userHasMentor() {
		return this.props.user.user.mentor !== null && this.props.user.user._id != this.props.me._id;
	}

	showBacklog(e) {
		this.refs.showBacklogBtn.classList.toggle('btn-blue');
		this.refs.showBacklogBtn.innerHTML = this.refs.showBacklogBtn.classList.contains('btn-blue') ? 'Hide backlog'
			: 'Show backlog';
		this.props.showBacklog();
	}

	render() {
		let apprentice;
		let backlogBtn;	
		let removeApprenticeButton;
		let isAdmin = this.props.me.localRole == 'admin';

		if ((this.userHasMentor() && this.isPersonsMentor()) || isAdmin) {
			backlogBtn = <button ref="showBacklogBtn" onClick={ this.showBacklog } className="btn btn-blue-hover apprentice">Show backlog</button>
		}

		if (this.isMentorOrAdmin() && !this.userHasMentor()) {
			apprentice = (<button className="btn btn-blue-hover apprentice" title="apprentice" onClick={this.takeApprentice}>Take apprentice</button>);
		} 

		if (!apprentice && (this.isPersonsMentor() || isAdmin)) {
			removeApprenticeButton = (<button className="btn btn-red-hover apprentice" title="remove apprentice" onClick={this.removeApprentice}>{ !this.isPersonsMentor() ? 'Remove mentor' : 'Finish mentoring' }</button>);
		}		

		let mentorAvatar = null;
		const {user} = this.props.user;

		var mentor = '';
		let photo;

		if(user.mentor == null) {
			mentor = 'Is not assigned';
			photo = (<i className='fi flaticon-user-3'></i>);
		} else {
			mentor = (user.mentor.userInfo.firstName +' '+ user.mentor.userInfo.lastName);
			photo = (<img src='https://pp.vk.me/c628730/v628730341/2e5d5/GGZg2j32zm4.jpg'/>);
		}

		return (
			<div id='topPanel'>
				<div className='userInfo'>
					{ backlogBtn }
					{ apprentice }
					{ removeApprenticeButton }
					<div className='logo'>
						<img src="https://pp.vk.me/c626130/v626130341/22c8c/jg0oHo3TYWs.jpg"/>
					</div>
					<div className='credentials'>
					{user.userInfo.firstName} {user.userInfo.lastName}
						<div>
							{ photo }
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
	let me = state.myState.me || '';
	return {
		me,
		user: state.userPage,
	};
}

const PersonsInfoConnected = connect(mapStateToProps, mapDispatchToProps)(PersonsInfo);
export default PersonsInfoConnected
