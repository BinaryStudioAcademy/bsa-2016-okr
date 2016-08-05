import "babel-polyfill"
import React from "react"
import { render } from "react-dom"
import App from "./containers/app"
import LoginPage from "./components/login-page.js"
import History from "./components/history-page/history-page.js"
import {IndexRoute, Route, Router, browserHistory} from 'react-router';

render(
    (<Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={LoginPage} />
          <Route path="history" component={History}/>
        </Route>
    </Router>)
    , document.getElementById('root')
);