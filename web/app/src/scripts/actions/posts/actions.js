import * as types from './types';
import * as Constants from '../../constants/urlConstants';
import { parseResponseJSON, checkHttpStatus } from '../../utils';
import { addSuccessMessage, addErrorMessage } from '../appMessages/actions';
import {sendRequest} from '../../utils/request-utils';

function getPostsRequest() {
    return {
        type: types.GET_POSTS_REQUEST
    }
}

function getPostsSuccess(response) {
    return {
        type: types.GET_POSTS_SUCCESS,
        posts: response
    }
}

function getPostsFailure(error) {
    return {
        type: types.GET_POSTS_FAILURE,
        payload: { error }
    }
}

export function getPosts() {
    return function(dispatch, getState) {
        dispatch(getPostsRequest());
          
        return sendRequest(`${Constants.POSTS}`,'GET',  dispatch, getState)
            .then(checkHttpStatus)
            .then(parseResponseJSON)
            .then(response => {
                dispatch(getPostsSuccess(response));
                return response;
            })
            .catch(error => {
                dispatch(getPostsFailure(error));
                dispatch(addErrorMessage(error.toString()));
            });
    }
}