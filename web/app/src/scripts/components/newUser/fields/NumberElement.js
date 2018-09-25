import React, { Component } from 'react';

export default class NumberElement extends Component {

    onDataChange = (nextValue) => {
        const { onChange, minValue } = this.props;

        if (nextValue.target.value >= minValue) {
            onChange(nextValue);
        }
    }

    render() {
        const { input, meta, title, glyphicon, required, value, onChange, disabled, minValue, readOnly } = this.props;

        var metaData = meta || {};
        const className = metaData.touched && metaData.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        if (disabled) {
            return (
                <div className="form-group has-feedback">
                    <label className={extraClass}>{title}: </label>
                    <input type="number" className="form-control" placeholder={title} value={value} disabled={disabled} minValue={minValue} disabled={readOnly}/>
                    <span className={"glyphicon form-control-feedback " + glyphicon } />
                    { metaData.touched && metaData.error && <span className="help-block validation-message">{ metaData.error }</span> }
                </div>
            );
        }

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>
                <input type="number" className="form-control" placeholder={title} onChange={this.onDataChange} value={value} disabled={readOnly}/>
                <span className={"glyphicon form-control-feedback " + glyphicon } />
                { metaData.touched && metaData.error && <span className="help-block validation-message">{ metaData.error }</span> }
            </div>
        );
    }
}
