import React, { Component } from 'react';

export default class CheckBoxField extends Component {
    render() {
        const { input, meta, title, glyphicon, required } = this.props;
        const className = meta.touched && meta.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        return (
            <div className="form-group has-feedback">
                <span className={extraClass}>{title}: </span> <input { ...input } placeholder={title} type="checkbox" />
                { meta.touched && meta.error && <span className="help-block validation-message">{ meta.error }</span> }
            </div>
        );
    }
}
