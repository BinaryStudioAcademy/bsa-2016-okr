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

		return (
			<header>
				<button id="bars" onClick={ this.onBarsClick } >
					<i className="fi flaticon-menu-1" aria-hidden="true"></i>
				</button>
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
	
	let userInfo = state.myState.me.userInfo || {};
	let { firstName, lastName, globalRole, email } = userInfo;
	
	return {
		firstName,
		lastName,
		localRole,
		globalRole,
		email,
	};
}

const HeaderConnected = connect(mapStateToProps)(Header);

export default HeaderConnected;