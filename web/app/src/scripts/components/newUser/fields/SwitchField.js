import React, { Component } from 'react';
import { Switch } from 'antd';

export default class SwitchField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.initValue
        }
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
        const { input, meta, title, glyphicon, required, name, firstOption, secondOption } = this.props;
        const { value } = this.state;
        const className = meta.touched && meta.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>
                <Switch checkedChildren={firstOption} unCheckedChildren={secondOption} onChange={this.onChange} defaultChecked={value} />
                <span className={"glyphicon form-control-feedback " + glyphicon } />
                { meta.touched && meta.error && <span className="help-block validation-message validation-message-select">{ meta.error }</span> }
            </div>
        );
    }
}
