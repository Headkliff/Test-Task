import React, { Component } from 'react';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker } = DatePicker;

export default class DateRangeField extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const { reset, onReset } = nextProps;
        if (reset) {
            this.setState({
                value: nextProps.initValue
            });
            onReset();
        }
    }

    onChange = (val) => {
        const { onValueChange } = this.props;
        this.setState({
            value: val
        });

        onValueChange(val);
    }

    render() {
        const { input, meta, title, glyphicon, required, name, initValue, readOnly } = this.props;
        const className = meta.touched && meta.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        if (this.props.reset) {
            return (<RangePicker onChange={this.onChange} defaultValue={[]} disabled={readOnly} />);
        }

        var mainElement = <RangePicker onChange={this.onChange} defaultValue={initValue} disabled={readOnly}/>;

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>
                {mainElement}
                <span className={"glyphicon form-control-feedback " + glyphicon } />
                { meta.touched && meta.error && <span className="help-block validation-message validation-message-select">{ meta.error }</span> }
            </div>
        );
    }
}
