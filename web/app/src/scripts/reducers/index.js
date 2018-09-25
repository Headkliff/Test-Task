import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form'

import posts from './posts';
import post from './post';
import comment from './comment';

const appReducer = combineReducers({
    posts,
    post,
    comment,
    form: reduxFormReducer,
});

const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_USER') {
      state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer
