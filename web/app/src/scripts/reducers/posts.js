import { Map } from 'immutable';
import * as types from '../actions/posts/types';

const initialState = {
    posts: []
};

const posts = (state = Map(initialState), action) => {
    switch (action.type) {
        case types.GET_POSTS_REQUEST:
            return state
                .set('isFetching', true);
        case types.GET_POSTS_FAILURE:
            return state
                .set('isFetching', false);
        case types.GET_POSTS_SUCCESS:
            return state
                .set('posts', action.posts)
                .set('isFetching', false);
        default:
            return state;
    }
};

export default posts;
