export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
    }
}

export function parseHttpStatusText(statusText){
  let matchResult = statusText.match(/^(\d*) (.*)$/);
  if(matchResult === null){
      return {
          subcode: "",
          text: statusText
      }
  }
  return {
      subcode: matchResult[1],
      text: matchResult[2]
  }
}

export function parseResponseJSON(response) {
     return response.json();
}
