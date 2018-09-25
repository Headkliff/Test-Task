import React, { Component, PropTypes } from 'react';
import AppMessage from './AppMessage';

export default class AppMessages extends Component {
    render() {
        const { messages, onClear } = this.props;

        if(!messages.length) {
            return null;
        }

        return (
            <div className="app-messages">
              <div className="container">
                <div className="row">
                  <div className="col-sm-offset-3 col-sm-6">
                    { messages.map(message =>
                       <AppMessage key={message.id} message={message} onClear={onClear} />
                    )}
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

AppMessages.propTypes = {
  messages: PropTypes.array.isRequired,
  onClear: PropTypes.func.isRequired
};
