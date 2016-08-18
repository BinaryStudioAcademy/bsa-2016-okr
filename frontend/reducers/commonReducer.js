import { combineReducers } from 'redux'
import message from './test-reducer1'
import counter from './test-reducer2'
import history from './historyReducer'
import recycleBin from './recycleBinReducer.js'
import usersList from './usersListReducer.js'
import userPage from './otherPersonReducer.js'
import mapping from './mappingReducer.js'
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  history,
  userPage,
  usersList,
  mapping,
  recycleBin,
  routing: routerReducer
})