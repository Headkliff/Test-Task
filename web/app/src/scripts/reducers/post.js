import { Map } from 'immutable';
import * as types from '../actions/post/types';

const initialState = {
    post: [],
    isFetching: false,
};

const post = (state = Map(initialState), action) => {
    switch (action.type) {
        case types.GET_POST_REQUEST:
        case types.CREATE_POST_REQUEST:
            return state
                .set('isFetching', true);
        case types.GET_POST_SUCCESS:
            return state
                .set('post', action.post)
                .set('isFetching', false);
        case types.CREATE_POST_SUCCESS:
            return state
                .set('isFetching', false);
        case types.GET_POST_FAILURE:
        case types.CREATE_POST_FAILURE:
            return state
                .set('isFetching', false);
        default:
            return state;
    }
};

export default post;
