import React, { Component } from 'react';
import Select from 'react-select';

export default class SolidSelectField extends Component {

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

        if (!val) {
            val = this.props.initValue
        }

        this.setState({
            value: val
        });

        onValueChange(val);
    }

    render() {
        const { input, meta, title, glyphicon, required, name, options } = this.props;
        const { value } = this.state;
        const className = meta && meta.touched && meta.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>
                <Select
                    name={name}
                    value={value}
                    options={options}
                    onChange={this.onChange}
                    placeholder={title}
                />
                <span className={"glyphicon form-control-feedback " + glyphicon } />
                { meta && meta.touched && meta.error && <span className="help-block validation-message validation-message-select">{ meta.error }</span> }
            </div>
        );
    }
}
