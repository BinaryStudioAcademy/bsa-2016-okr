import React, { Component } from 'react';
import Header from "./header.jsx";
import NavMenu from "../components/common/nav-menu.jsx";
import MainPage from './main-page.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import "normalize.css";
import '../components/common/fonts/flaticon/_flaticon.scss';
import '../components/common/fonts/fira/_fira.scss';
import './app.scss';


class App extends Component {
	constructor(props) {
		super(props);
	}

	// <LoadingScreen />
	render() {
		return (
			<div id="application">
				<Header />
				<NavMenu />
				<MainPage>
				{this.props.children}
				{
					(() => {
						if (process.env.NODE_ENV !== 'production') {
							const DevTools = require('../shared/devtools/DevTools').default;
							return <DevTools />;
						}
					})()
				}
				</MainPage>
			</div>
			);
	}
}

export default App
