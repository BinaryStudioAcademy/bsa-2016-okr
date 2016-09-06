import React from "react";
import { render } from "react-dom";
import { IndexRoute, Route, Router, IndexRedirect, browserHistory } from 'react-router';
import CONST from '../backend/config/constants';

import App from "./containers/app";
import History from "./components/admin/history-page/history-page.js";
import HomePage from "./components/home-page/home-page.js";
import RolesPage from "./components/admin/role-mapping/role-mapping.js";
import ObjAccept from "./components/admin/accept-objective/accept-objective.js";
import UserPage from "./components/other-persons-page/other-persons-page.js";
import ObjectiveView from "./components/objectiveView/objectiveView.js";
import OKRmanaging from "./components/admin/OKRmanaging/OKRmanaging.js";
import UserRecycleBin from './components/user-recycle-bin/recycle-bin.jsx';
import AdminRecycleBin from './components/admin/admin-recycle-bin/recycle-bin.jsx';
import ListOfUsers from './components/list-of-users/list-of-users.jsx';
import StatsPage from './components/dashboard/StatsPage.jsx';
import NotFound from './components/common/notFound.jsx';

import configureStore from './store/configureStore';

import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { syncHistoryWithStore } from 'react-router-redux'

import reducer from './reducers/commonReducer'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

render(
	(<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={HomePage} />
				<Route path="users" component={ListOfUsers} />
				<Route path="user/:id" component={UserPage} />
				<Route path="recycle-bin" component={UserRecycleBin} />
				<Route path="charts" component={StatsPage} onEnter={ adminOnly } />
				<Route path="roles" component={RolesPage} onEnter={ adminOnly } />
				<Route path="history" component={History} onEnter={ adminOnly } />
				<Route path="obj-accept" component={ObjAccept} onEnter={ adminOnly } />
				<Route path="okr-managing" component={OKRmanaging} onEnter={ adminOnly } />
				<Route path="admin-recycle-bin" component={AdminRecycleBin} onEnter={ adminOnly } />
				<Route path="objective" component={ObjectiveView} />
				<Route path="*" component={NotFound}>
					<IndexRedirect from="*" to="/" />
				</Route>
			</Route>
		</Router>
	</Provider>)
	, document.getElementById('root'));

function adminOnly(nextState, transition, callback) {
	let reducer = store.getState();
	let localRole = reducer.myState.me.localRole;

	if(localRole !== CONST.user.role.ADMIN) {
		transition('/');
	}

	return callback();
}