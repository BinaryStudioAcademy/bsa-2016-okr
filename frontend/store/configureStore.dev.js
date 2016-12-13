import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/commonReducer';
import DevTools from '../shared/devtools/DevTools';

const enhancer = compose(
	applyMiddleware(thunk),
	applyMiddleware(routerMiddleware(browserHistory)),
	window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
	persistState(
		window.location.href.match(
			/[?&]debug_session=([^&#]+)\b/
		)
	)
);

export default function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, enhancer, window.devToolsExtension && window.devToolsExtension());

	if (module.hot) {
		module.hot.accept('../reducers/commonReducer', () =>
			store.replaceReducer(require('../reducers/commonReducer').default)
		);
	}

	return store;
}
