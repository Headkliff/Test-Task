import { parseHttpStatusText } from './http-utils';

const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export function sendRequest(url, method, dispatch, getState, body = null, headers = defaultHeaders) {    
    let fetchOptions = {
        method: method,
        mode: 'cors',
        headers: {
            ...headers
        }
    };

    if(body) {
        fetchOptions.body = body;
    }

    let requestedUrl = url;

    return fetch(requestedUrl, fetchOptions)
        .then (response => {
                let parsedStatusText = parseHttpStatusText(response.statusText);

                if (response.status == 401)
                {
                    var error = prepareError(response.status, parsedStatusText);
                    throw error;
                }
                
                return response;
            }
        )
        .catch(error => {
            throw error;
        })
    }

function prepareError(status, parsedStatusText){
    var error = new Error(parsedStatusText.text);
    error.status = `${status} ${parsedStatusText.subcode}`;
    error.statusText = parsedStatusText.text;
    return error;
}


