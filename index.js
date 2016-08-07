import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import LoginPage from './components/login-page.js';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import RecycleBin from './components/RecycleBin/RecycleBin.js';

render(
    (<Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={LoginPage} />
          <Route path="recycle-bin" component={RecycleBin}/>
        </Route>
    </Router>)
    , document.getElementById('root')
);
