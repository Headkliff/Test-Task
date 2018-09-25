import * as types from '../../actions/appMessages/types';

import { Button, notification } from 'antd';

const initialState = [];

function performAddMessage(state, action) {

    var newMessage = Object.assign({}, action.message);
    const newState = state.concat(newMessage);
    return newState;
}

function performClearMessage(state, action) {
    const newState = state.filter(message => message.id !== action.messageId);
    return newState;
}

export default function appMessages(state = initialState, action = {}) {
    switch (action.type) {
        case types.ADD_APP_MESSAGE:
            return performAddMessage(state, action);

        case types.CLEAR_APP_MESSAGE:
            return performClearMessage(state, action);
        default:
            return state;
    }
}
