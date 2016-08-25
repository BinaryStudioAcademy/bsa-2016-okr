import { combineReducers } from 'redux';
import history from './historyReducer';
import recycleBin from './recycleBinReducer';
import usersList from './usersListReducer';
import okrManaging from './okrManagingReducer';
import userPage from './otherPersonReducer';
import mapping from './mappingReducer' ;
import myState from './myStateReducer';
import keyResults from './keyResultReducer';
import categories from './categoriesReducer';
import app from './appReducer';

import { routerReducer } from 'react-router-redux';

export default combineReducers({
  app,
  categories,
  myState,
  history,
  userPage,
  usersList,
  okrManaging,
  mapping,
  recycleBin,
  keyResults,
  routing: routerReducer
});
