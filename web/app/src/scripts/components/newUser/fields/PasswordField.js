import React, { Component } from 'react';

export default class PasswordField extends Component {
    render() {
        const { input, meta, title, glyphicon, required, hidden, readOnly } = this.props;
        const className = meta.touched && meta.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        if (hidden) {
            return null;
        }

        var readonlyAttr = false;
        if (readOnly) {
            readonlyAttr = true;
            extraClass = "readonly";
        }

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>
                <input { ...input } type="password" className="form-control" placeholder={title} readOnly={readonlyAttr}/>
                <span className={"glyphicon form-control-feedback " + glyphicon } />
                { meta.touched && meta.error && <span className="help-block validation-message">{ meta.error }</span> }
            </div>
        );
    }
}
