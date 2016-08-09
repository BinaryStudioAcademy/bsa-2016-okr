import React, { Component } from 'react';
import Header from "../containers/header.jsx";
import NavMenu from "../components/nav-menu.jsx";
import MainPage from '../containers/main-page.jsx';
import './app.scss';

export default class App extends Component {

	render() {
		return (
			<div id="application">
				<Header />
				<NavMenu />
				<MainPage>
					{this.props.children}	
				</MainPage>
		    </div>
      );
    }
}
