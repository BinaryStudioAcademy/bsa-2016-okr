import { combineReducers } from 'redux'
import message from './test-reducer1'
import counter from './test-reducer2'

export default combineReducers({
  message,
  counter
})