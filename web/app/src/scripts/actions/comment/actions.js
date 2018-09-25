import * as types from './types';
import * as Constants from '../../constants/urlConstants';
import { checkHttpStatus, sendRequest } from '../../utils';
import { addSuccessMessage, addErrorMessage } from '../appMessages/actions';

function createCommentRequest() {
    return {
        type: types.CREATE_COMMENT_REQUEST
    }
}

function createCommentSuccess(response) {
    return {
        type: types.CREATE_COMMENT_SUCCESS,
        comment: response
    }
}

function createCommentFailure(error) {
    return {
        type: types.CREATE_COMMENT_FAILURE,
        payload: { error }
    }
}

export function createComment(commentData, redirect) {
    return function(dispatch, getState) {
        dispatch(createCommentRequest());
        let str = JSON.stringify(commentData);
        
        return sendRequest(`${Constants.COMMENTS}`,'POST',  dispatch, getState, str)
            .then(checkHttpStatus)
            .then(response => {                
                dispatch(createCommentSuccess());
                dispatch(addSuccessMessage("Comment has been added"));
                redirect && redirect();
            })
            .catch(error => {
                dispatch(createCommentFailure(error));
                dispatch(addErrorMessage(error.toString()));
            });
    }
}





