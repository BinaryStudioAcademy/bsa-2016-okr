import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetalert from 'sweetalert';
import '../common/styles/sweetalert.scss';

import * as actions from "../../actions/otherPersonActions.js";

class PersonsInfo extends Component {
	constructor(props){
		super(props);
		this.takeApprentice = this.takeApprentice.bind(this);
		this.removeApprentice = this.removeApprentice.bind(this);
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

	render() {
		let apprentice;

		if (this.props.user.user.mentor == null && this.props.user.user._id != this.props.me._id && (this.props.me.localRole == 'mentor' || this.props.me.localRole == 'admin')) {
			apprentice = (<button className="btn btn-blue-hover apprentice" title="apprentice" onClick={this.takeApprentice}>Take apprentice</button>);
		}

		let removeApprenticeButton;

		if (this.props.user.user.mentor != null && this.props.user.user.mentor._id == this.props.me._id && this.props.user.user._id != this.props.me._id) {
			removeApprenticeButton = (<button className="btn btn-red-hover apprentice" title="remove apprentice" onClick={this.removeApprentice}>Finish mentoring</button>);
		}

		let mentorAvatar = null;
		const {user} = this.props.user

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
		categories: state.categories
	};
}

const PersonsInfoConnected = connect(mapStateToProps, mapDispatchToProps)(PersonsInfo);
export default PersonsInfoConnected
