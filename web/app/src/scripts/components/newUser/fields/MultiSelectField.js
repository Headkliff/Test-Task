import React, { Component } from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default class MultiSelectField extends Component {

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

    renderChildren = (options) => {
        return options.map((option) => {
            return <Option key={option.value} title={option.label}>{option.label}</Option>
        })
    }

    render() {
        const { input, meta, title, glyphicon, required, name, options, initValue, readOnly } = this.props;
        const className = meta.touched && meta.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        if (this.props.reset) {
            return (<Select
                mode="tags"
                style={{ width: '100%' }}
                onChange={this.onChange}
                tokenSeparators={[',']}
                defaultValue={[]}
              >
                {this.renderChildren([])}
            </Select>);
        }

        var mainElement = null;
        if (options && options.length) {

            var labelValues = initValue.map((id) => {
                for (var i = 0; i < options.length; i++){
                    if (options[i].value.toString() === id.toString()) {
                        return options[i].value.toString();
                    }
                }
            });

            mainElement = (
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={this.onChange}
                    tokenSeparators={[',']}
                    defaultValue={labelValues}
                    disabled={readOnly}
                  >
                    {this.renderChildren(options)}
                </Select>
            );
        }

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
