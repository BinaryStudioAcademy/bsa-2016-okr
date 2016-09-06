import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CONST from '../../backend/config/constants';

import Header from "./header.jsx";
import NavMenu from "../components/common/nav-menu.jsx";
import MainPage from './main-page.jsx';
import LoadingScreen from '../components/common/LoadingScreen.jsx';
import LoadingModal from '../components/common/LoadingModal.jsx';

import * as categoriesActions from '../actions/categoriesActions';
import * as myStateActions from '../actions/myStateActions';
import * as appActions from '../actions/appActions';

import '../components/common/fonts/flaticon/_flaticon.scss';
import '../components/common/fonts/flaticon-1/_flaticon-1.scss';
import '../components/common/fonts/fira/_fira.scss';
import './app.scss';


class App extends Component {
	constructor(props) {
		super(props);

		this.props.categoriesActions.getAllCategories();
		this.props.myStateActions.getMe();
		this.props.appActions.init();
	}

	render() {
		let localRole = this.props.localRole || CONST.user.role.USER;
	  
	  let ContentEl = (
	   <div>
	    <LoadingModal show={ this.props.isLoading } />
	    <Header />
	    <NavMenu localRole={ localRole }/>
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

	  if(this.props.isInitializing) {
	   ContentEl = <div></div>
	  }

	  return (
	   <div id="application">
	    <LoadingScreen show={ this.props.isInitializing } />
	    { ContentEl }
	   </div>
	   );
	 }
}

function mapStateToProps(state) {
	return {
		isLoading: state.app.isLoading,
		isInitializing: state.app.isInitializing,
		localRole: state.myState.me.localRole,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		categoriesActions: bindActionCreators(categoriesActions, dispatch),
		myStateActions: bindActionCreators(myStateActions, dispatch),
		appActions: bindActionCreators(appActions, dispatch)
	};
}

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
