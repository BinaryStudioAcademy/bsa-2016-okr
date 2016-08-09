import { combineReducers } from 'redux'
import message from './test-reducer1'
import counter from './test-reducer2'
import showObjectives from "./admin/OKRmanagingReducer"
import search from "./admin/OKRmanagingReducer"



export default combineReducers({
  message,
  counter,
  showObjectives,
  search
})