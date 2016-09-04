import React from 'react';
import { Link } from 'react-router';
import './nav-menu.scss';

const NavMenu = (props) => {
	return (
		<aside id="navbar" ref="">
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
						<Link to="/history" activeClassName="active">
							<i className="fi flaticon-time" aria-hidden="true"></i>
							History
						</Link>
					</li>
					<li>
						<Link to="/roles" activeClassName="active">
							<i className="fi flaticon-folder-14" aria-hidden="true"></i>
							Role mapping
						</Link>
					</li>
					<li>
						<Link to="/okr-managing" activeClassName="active">
							<i className="fi flaticon-folder-19" aria-hidden="true"></i>
							OKR managing
						</Link>
					</li>
					<li>
						<Link to="/recycle-bin" activeClassName="active">
							<i className="fi flaticon-garbage-1" aria-hidden="true"></i>
							Recycle Bin
						</Link>
					</li>
					<li>
						<Link to="/admin-recycle-bin" activeClassName="active">
							<i className="fi flaticon-garbage-1" aria-hidden="true"></i>
							Admin Recycle Bin
						</Link>
					</li>
					<li>
						<Link to="/charts" activeClassName="active">
							<i className="fi flaticon-bookmark-1" aria-hidden="true"></i>
							Statistics
						</Link>
					</li>
					<li>
						<Link to="/obj-accept" activeClassName="active">
							<i className="fi flaticon-folder-17" aria-hidden="true"></i>
							Accept Objective
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	)
};

function closeNav() {
	let nav = document.getElementById('navbar');
	let menuBars = document.getElementById('bars');

	nav.classList.remove('opened');
	menuBars.classList.remove('active');
}

export default NavMenu;
