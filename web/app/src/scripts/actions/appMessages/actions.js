import React, { Component,PropTypes } from 'react';
import * as types from './types';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_INFO, MESSAGE_TYPE_WARN, MESSAGE_TYPE_ERROR, CLEAR_MESSAGE_TIMEOUT } from './constants';
import { message, Alert } from 'antd';
import { Link } from 'react-router-dom';


const openNotificationWithIcon = (type, description) => {

    var alert = <Alert message={description} type={type} />;

    message[type](alert, CLEAR_MESSAGE_TIMEOUT);
}

export function addMessage(messageText, type)
{
    return (dispatch, getState) => {

        if (messageText.includes("$$"))  {
            var splittedText = messageText.split("$$");
            var linkPart = splittedText[1].split("|");
            messageText = <div>{splittedText[0]} <a href={linkPart[1]}>{linkPart[0]}</a> {splittedText[2]}</div>;
        }
        
        openNotificationWithIcon(type, messageText);
    }
}

export function clearMessage(messageId)
{
    return (dispatch, getState) => {
    }
}

export function addInfoMessage(message)
{
    return addMessage(message, 'info');
}

export function addSuccessMessage(message)
{
    return addMessage(message, 'success');
}

export function addWarnMessage(message)
{
    return addMessage(message, 'warning');
}

export function addErrorMessage(message)
{
    return addMessage(message, 'error');
}
