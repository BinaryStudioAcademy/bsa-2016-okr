import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/commonReducer';

const enhancer = compose(
	applyMiddleware(thunk),
	applyMiddleware(routerMiddleware(browserHistory))
);

export default function configureStore(initialState) {
	return createStore(rootReducer, initialState, enhancer);
}
