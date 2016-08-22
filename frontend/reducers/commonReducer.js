import { combineReducers } from 'redux'
import message from './test-reducer1'
import counter from './test-reducer2'
import history from './historyReducer'
import recycleBin from './recycleBinReducer.js'
import usersList from './usersListReducer.js'
import okrManaging from './okrManagingReducer.js'
import userPage from './otherPersonReducer.js'
import mapping from './mappingReducer.js'
import myState from './myStateReducer.js'
import keyResults from './keyResultReducer'
import categoriesList from './categoriesListReducer'

import { routerReducer } from 'react-router-redux';

export default combineReducers({
  categoriesList,
  myState,
  history,
  userPage,
  usersList,
  okrManaging,
  mapping,
  recycleBin,
  keyResults,
  routing: routerReducer
})
