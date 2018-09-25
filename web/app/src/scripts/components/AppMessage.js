import React, { Component, PropTypes } from 'react';

export default class AppMessage extends Component {
    render() {
        const { message, onClear } = this.props;
        const className = `alert alert-${message.type} alert-dismissible alert-center`;

        return (
            <div className={className}>
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true" onClick={() => onClear(message.id)}>×</button>
                <h4><i className="icon fa fa-info" /> {message.text} </h4>
            </div>
        );
    }
}

AppMessage.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired,
    onClear: PropTypes.func.isRequired
};
