import { combineReducers } from 'redux'
import message from './test-reducer1'
import counter from './test-reducer2'
import history from './historyReducer'
import users from './otherPersonReducer.js'
import mapping from './mappingReducer.js'

export default combineReducers({
  history,
  users,
  mapping
})