import React, { Component } from 'react';

export default class AreaField extends Component {
    render() {
        const { input, meta, title, glyphicon, required, hidden, readOnly } = this.props;

        var metaData = meta || {};
        const className = metaData.touched && metaData.error ? 'has-error' : '';

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
                <textarea { ...input } type="text" className="form-control area-standard" placeholder={title} readOnly={readonlyAttr} disabled={readOnly}/>
                <span className={"glyphicon form-control-feedback " + glyphicon } />
                { metaData.touched && metaData.error && <span className="help-block validation-message">{ metaData.error }</span> }
            </div>
        );
    }
}
