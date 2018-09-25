import React, { Component } from 'react';

export default class NumberField extends Component {
    render() {
        const { input, meta, title, glyphicon, required, value, onChange } = this.props;

        var metaData = meta || {};
        const className = metaData.touched && metaData.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>
                <input { ...input } type="number" className="form-control" placeholder={title} />
                <span className={"glyphicon form-control-feedback " + glyphicon } />
                { metaData.touched && metaData.error && <span className="help-block validation-message">{ metaData.error }</span> }
            </div>
        );
    }
}
