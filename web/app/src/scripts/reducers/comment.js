import { Map } from 'immutable';
import * as types from '../actions/comment/types';

const initialState = {
    comment: null,
    isFetching: false,
};

const comment = (state = Map(initialState), action) => {
    switch (action.type) {
        case types.GE:
        case types.CREATE_COMMENT_REQUEST:
            return state
                .set('isFetching', true);
        case types.CREATE_COMMENT_SUCCESS:
            return state
                .set('comment', action.comment)
                .set('isFetching', false);
        case types.CREATE_COMMENT_FAILURE:
            return state
                .set('isFetching', false);
        default:
            return state;
    }
};

export default comment;
