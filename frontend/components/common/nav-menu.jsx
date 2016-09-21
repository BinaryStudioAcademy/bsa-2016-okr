import React from 'react';
import { Link } from 'react-router';
import CONST, { ROOT_URL } from '../../../backend/config/constants';

import './nav-menu.scss';

const NavMenu = (props) => {
	const isAdmin = (props.localRole === CONST.user.localRole.ADMIN);
	const count = props.acceptObjective.countObject;
	let notificationClass = "";

	if (count > 0) {
		notificationClass = "notification"
	}

	const AdminLinksEl = (
		<ul className="nav-divider-before">
			<li>
				<Link to={`${ ROOT_URL }/roles`} className="on-tooltip" activeClassName="active">
					<i className="fi-1 flaticon-1-business-1" aria-hidden="true"></i>
					Role mapping
					<i className="tooltip" data-direction="right">Role mapping</i>
				</Link>
			</li>
			<li>
				<Link to={`${ ROOT_URL }/obj-accept`} className="on-tooltip" activeClassName="active">
					<i className="fi flaticon-checked-1" aria-hidden="true">
						<div className="badge"><div className={"badge-counter " + notificationClass}>{ count }</div></div>
					</i>
					Accept Template
					<i className="tooltip" data-direction="right">Accept Template</i>
				</Link>
			</li>
			<li>
				<Link to={`${ ROOT_URL }/okr-managing`} className="on-tooltip" activeClassName="active">
					<i className="fi flaticon-app" aria-hidden="true"></i>
					OKR managing
					<i className="tooltip" data-direction="right">OKR Managing</i>
				</Link>
			</li>
			<li>
				<Link to={`${ ROOT_URL }/admin-recycle-bin`} className="on-tooltip" activeClassName="active">
					<i className="fi flaticon-garbage-1" aria-hidden="true">
						<div className="badge">
							<i className="fi flaticon-worldwide" aria-hidden="true"></i>
						</div>
					</i>
					Admin Recycle Bin
					<i className="tooltip" data-direction="right">Admin Recycle Bin</i>
				</Link>
			</li>
		</ul>
	);

	const CommonLinksEl = (
		<ul>
			<li>
				<Link to={`${ ROOT_URL }/`} className="on-tooltip" onlyActiveOnIndex activeClassName="active">
					<i className="fi flaticon-home-1" aria-hidden="true"></i>
					Home
					<i className="tooltip" data-direction="right">Home</i>
				</Link>
			</li>
			<li>
				<Link to={`${ ROOT_URL }/users`} className="on-tooltip" activeClassName="active">
					<i className="fi flaticon-users" aria-hidden="true"></i>
					Users
					<i className="tooltip" data-direction="right">Users</i>
				</Link>
			</li>
			<li>
				<Link to={`${ ROOT_URL }/history`} className="on-tooltip" activeClassName="active">
					<i className="fi flaticon-time" aria-hidden="true"></i>
					History
					<i className="tooltip" data-direction="right">History</i>
				</Link>
			</li>
			<li>
				<Link to={`${ ROOT_URL }/charts`} className="on-tooltip" activeClassName="active">
					<i className="fi-1 flaticon-1-arrow-chart" aria-hidden="true"></i>
					Statistics
					<i className="tooltip" data-direction="right">Statistics</i>
				</Link>
			</li>
			<li>
				<Link to={`${ ROOT_URL }/recycle-bin`} className="on-tooltip" activeClassName="active">
					<i className="fi flaticon-garbage-1" aria-hidden="true"></i>
					Recycle Bin
					<i className="tooltip" data-direction="right">Recycle Bin</i>
				</Link>
			</li>
		</ul>
	);

	return (
		<div>
		<button id="bars" onClick={ onBarsClick } >
			<i className="fi flaticon-menu-1" aria-hidden="true"></i>
		</button>
		<aside id="navbar" className='hideMenu'>
			<nav onClick={ closeNav }>
				{ CommonLinksEl }
				{ isAdmin ? AdminLinksEl : '' }
			</nav>
		</aside>
		</div>
	)
};

function onBarsClick(event) {
		let target = event.target;
		let nav = document.querySelector('aside#navbar');
		if(!target.classList.contains('active')){
			target.classList.add('active');
			nav.classList.add('showMenu');
			nav.classList.remove('hideMenu');
		} else {
			target.classList.remove('active');
			nav.classList.remove('showMenu');
			nav.classList.add('hideMenu');
		}
	}
function closeNav() {

	let nav = document.getElementById('navbar');
	let menuBars = document.getElementById('bars');
	let navbar = document.querySelector('aside#navbar');

    if (nav != null && nav.classList.contains("opened"))
		nav.classList.remove('opened');

	if (menuBars != null && menuBars.classList.contains("active"))
		menuBars.classList.remove('active');

	if(navbar.classList.contains('showMenu')) {
		nav.classList.remove('showMenu');
		nav.classList.add('hideMenu');
	}

}

export default NavMenu;
