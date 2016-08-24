import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from "./header.jsx";
import NavMenu from "../components/common/nav-menu.jsx";
import MainPage from './main-page.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';

import * as categoriesActions from '../actions/categoriesActions.js';

import "normalize.css";
import '../components/common/fonts/flaticon/_flaticon.scss';
import '../components/common/fonts/fira/_fira.scss';
import './app.scss';


class App extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.actions.categories.getAllCategories(); 
	}

	// <LoadingScreen show={ true } />
	render() {
		return (
			<div id="application">
			<Header />
			<NavMenu />
			<MainPage>
			{ this.props.children }
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

// function mapStateToProps(state) {
// 	return {
// 		stateFromReducer: state
// 	};
// }

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			categories: bindActionCreators(categoriesActions, dispatch)
		}
	};
}

const AppConnected = connect(null, mapDispatchToProps)(App);

export default AppConnected;
