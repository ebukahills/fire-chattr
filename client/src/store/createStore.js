import {
	createStore,
	applyMiddleware,
	compose,
	combineReducers
} from 'redux';

import thunk from 'redux-thunk';

import {
	authReducer,
	errorReducer,
	userReducer,
} from '../reducers/reducers';

// connected-react-router setup
// https://www.npmjs.com/package/connected-react-router
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

var configure = (initialState = {}) => {
	var reducer = combineReducers({
		auth: authReducer,
		error: errorReducer,
		user: userReducer,
	});
	var store = createStore(
		connectRouter(history)(reducer),
		initialState,
		compose(
		applyMiddleware(thunk, routerMiddleware(history)),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Enable Redux DevTools
	))
	return store;
}

export default configure;
