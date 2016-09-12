import React from 'react';
import { Link } from 'react-router';
import CONST from '../../../backend/config/constants';

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
				<Link to="/charts" activeClassName="active">
					<i className="fi-1 flaticon-1-arrow-chart" aria-hidden="true"></i>
					Statistics
				</Link>
			</li>
			<li>
				<Link to="/roles" activeClassName="active">
					<i className="fi-1 flaticon-1-business-1" aria-hidden="true"></i>
					Role mapping
				</Link>
			</li>
			<li>
				<Link to="/history" activeClassName="active">
					<i className="fi flaticon-time" aria-hidden="true"></i>
					History
				</Link>
			</li>
			<li>
				<Link to="/obj-accept" activeClassName="active">
					<i className="fi flaticon-checked-1" aria-hidden="true">
						<div className="badge"><div className={"badge-counter " + notificationClass}>{ count }</div></div>
					</i>
					Accept Template
				</Link>
			</li>
			<li>
				<Link to="/okr-managing" activeClassName="active">
					<i className="fi flaticon-app" aria-hidden="true"></i>
					OKR managing
				</Link>
			</li>
			<li>
				<Link to="/admin-recycle-bin" activeClassName="active">
					<i className="fi flaticon-garbage-1" aria-hidden="true">
						<div className="badge">
							<i className="fi flaticon-worldwide" aria-hidden="true"></i>	
						</div>
					</i>
					Admin Recycle Bin
				</Link>
			</li>
		</ul>
	);
	
	return (
		<aside id="navbar">
			<nav onClick={ closeNav }>
				<ul>
					<li>
						<Link to="/" onlyActiveOnIndex activeClassName="active">
							<i className="fi flaticon-home-1" aria-hidden="true"></i>
							Home
						</Link>
					</li>
					<li>
						<Link to="/users" activeClassName="active">
							<i className="fi flaticon-users" aria-hidden="true"></i>
							Users
						</Link>
					</li>	
					<li>
						<Link to="/recycle-bin" activeClassName="active">
							<i className="fi flaticon-garbage-1" aria-hidden="true"></i>
							Recycle Bin
						</Link>
					</li>
				</ul>
				{ isAdmin ? AdminLinksEl : '' }
			</nav>
		</aside>
	)
};

function closeNav() {

	let nav = document.getElementById('navbar');
	let menuBars = document.getElementById('bars');

    if (nav != null && nav.classList.contains("opened"))
		nav.classList.remove('opened');

	if (menuBars != null && menuBars.classList.contains("active"))
		menuBars.classList.remove('active');
}

function acceptObjectivesCount() {

}

export default NavMenu;
