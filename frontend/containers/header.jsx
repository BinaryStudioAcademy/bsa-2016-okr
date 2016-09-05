import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.scss';

class Header extends Component {
	constructor() {
		super();

		this.onBarsClick = this.onBarsClick.bind(this);
	}

	onBarsClick(event) {
		let target = event.target;
		let menu = document.getElementById('navbar');

		if(!target.classList.contains('active')){
			target.classList.add('active');
			menu.classList.add('opened');
		} else {
			target.classList.remove('active');
			menu.classList.remove('opened');
		}
	}

	render() {
		const fullName = `${ this.props.firstName } ${ this.props.lastName }` || '';
		const globalRole = this.props.globalRole || '';
		let mentor = '';
		let photo;

		if(this.props.mentor == null) {
			mentor = 'Is not assigned';
			photo = (<i className='fi flaticon-user-3'></i>);
		} else { 
			mentor = (this.props.mentor.userInfo.firstName +' '+ this.props.mentor.userInfo.lastName)
			photo = (<img src='https://pp.vk.me/c628730/v628730341/2e5d5/GGZg2j32zm4.jpg'/>);
		}

		return (
			<header>
				<button id="bars" onClick={ this.onBarsClick } >
					<i className="fi flaticon-menu-1" aria-hidden="true"></i>
				</button>
				{/*<div className='mentor-info'>
					{ photo }
					<div className='mentorName'>
						<span className='mentorTitle'>Mentor:</span> 
						<br /> {mentor} 
					</div> 
				</div>*/}
				<div className="user-info clearfix">
					<div className="logo">
						<img src="http://www.appresume.com/cv_templates/cv_2_1/conf/images/profile.jpg" alt="" />
					</div>
					<div className="credentials">
						<span className="name">{ fullName }</span><br/>
						<span className="field">{ globalRole }</span>
					</div>
				</div>
				{ this.props.children }
			</header>
			)
	}
}

function mapStateToProps(state) {
	let localRole = state.myState.me.localRole || '';
	let mentor = state.myState.me.mentor;
	let userInfo = state.myState.me.userInfo || {};
	let { firstName, lastName, globalRole, email } = userInfo;
 
	return {
		firstName,
		lastName,
		localRole,
		globalRole,
		email,
		mentor
	};
}

const HeaderConnected = connect(mapStateToProps)(Header);

export default HeaderConnected;