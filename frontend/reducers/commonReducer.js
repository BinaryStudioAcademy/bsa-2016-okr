import { combineReducers } from 'redux'
import message from './test-reducer1'
import counter from './test-reducer2'
import history from './historyReducer'
import users from './otherPersonReducer.js'
import recycle from './recycle'

export default combineReducers({
	message,
	counter,
	history,
	users,
	recycle
})