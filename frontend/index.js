import React from "react"
import { render } from "react-dom"
import App from "./containers/app"
import LoginPage from "./components/login-page.js"
import History from "./components/history-page/history-page.js"
import HomePage from "./components/home-page.js"
import RolesPage from "./components/admin/RoleMapping/role-mapping.js"
import UserPage from "./components/other-persons-page/other-persons-page.js"
import {IndexRoute, Route, Router, browserHistory} from 'react-router'
import ObjectiveView from "./components/objectiveView/objectiveView.js"
import OKRmanaging from "./components/admin/OKRmanaging/OKRmanaging.js"
import RecycleBin from './components/admin/RecycleBin/RecycleBin.js'
import DeletedTmpls from './components/admin/RecycleBin/DeletedTmpls.js'
import DeletedPlans from './components/admin/RecycleBin/DeletedPlans.js'
import DeletedTmplDetails from "./components/admin/RecycleBin/deletedTmplDetails.js"

import DevTools from './shared/devtools/DevTools';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers/commonReducer'

const middleware = [ thunk ]

const store = createStore(
	reducer,
	applyMiddleware(...middleware),
	DevTools.instrument()
)

render(
		(<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={HomePage} />
					<Route path="users" component={UserPage} />
					<Route path="history" component={History} />
					<Route path="roles" component={RolesPage} />
					<Route path="objective" component={ObjectiveView} />
					<Route path="okr-managing" component={OKRmanaging} />
					<Route path="recycle-bin" component={RecycleBin}>
						<Route path="/deleted-tmpls" component={DeletedTmpls} />
						<Route path="/deleted-tmpls/:id" component={DeletedTmplDetails} />
						<Route path="/deleted-plans" component={DeletedPlans} />
					</Route>
				</Route>
			</Router>
		</Provider>)
		, document.getElementById('root')
)
