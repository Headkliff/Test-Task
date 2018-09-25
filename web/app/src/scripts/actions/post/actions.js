import * as types from './types';
import * as Constants from '../../constants/urlConstants';
import { parseResponseJSON, checkHttpStatus } from '../../utils';
import { addSuccessMessage, addErrorMessage } from '../appMessages/actions';
import {sendRequest} from '../../utils/request-utils';

function getPostRequest() {
    return {
        type: types.GET_POST_REQUEST
    }
}

function getPostSuccess(response) {
    return {
        type: types.GET_POST_SUCCESS,
        post: response
    }
}

function getPostFailure(error) {
    return {
        type: types.GET_POST_FAILURE,
        payload: { error }
    }
}

export function getPost(postId) {
    return function(dispatch, getState) {
        dispatch(getPostRequest());
        return sendRequest(`${Constants.POSTS}/${postId}`,'GET',  dispatch, getState)
            .then(checkHttpStatus)
            .then(parseResponseJSON)
            .then(response => {
                dispatch(getPostSuccess(response));
            })
            .catch(error => {
                dispatch(getPostFailure(error));
                dispatch(addErrorMessage(error.toString()));
            });
    }
}

function createPostRequest() {
    return {
        type: types.CREATE_POST_REQUEST
    }
}

function createPostSuccess(response) {
    return {
        type: types.CREATE_POST_SUCCESS,
        post: response
    }
}

function createPostFailure(error) {
    return {
        type: types.CREATE_POST_FAILURE,
        payload: { error }
    }
}

export function createPost(postData, redirect) {
    return function(dispatch, getState) {
        dispatch(createPostRequest());
        let str = JSON.stringify(postData);
        return sendRequest(`${Constants.POSTS}`,'POST',  dispatch, getState, str)
            .then(checkHttpStatus)
            .then(response => {
                dispatch(createPostSuccess());
                dispatch(addSuccessMessage("Post has been successfully created."));
                redirect && redirect()
            })
            .catch(error => {
                dispatch(createPostFailure(error));
                dispatch(addErrorMessage(error.toString()));
            });
    }
}





