import { combineReducers } from 'redux';
import profileDialog from './profileDialogReducer';
import user from './userReducer';

const reducer = combineReducers({
    profileDialog,
    user,
});

export default reducer;
