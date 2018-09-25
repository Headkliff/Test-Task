import React, { Component } from 'react';
import { Select, Badge  } from 'antd';
const Option = Select.Option;

export default class MultiSelectInsertingField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: props.initValue.map((value) => { return value.toString() }),
            newValues: [],
            value: props.initValue.map((value) => { return value.toString() }),
        }
    }

    componentWillReceiveProps(nextProps) {
        const { reset, onReset } = nextProps;
        if (reset) {
            this.setState({
                value: nextProps.initValue,
                newValues: [],
                values: nextProps.initValue
            });
            onReset();
        }
    }

    renderChildren = (options, newOptions = []) => {
        return options.map((option) => {
            return <Option key={option.value} title={option.label}>{option.label}</Option>
        })
    }

    removeByValue = (arr, value) => {
        var index = arr.indexOf(value);

        if (index >= 0) {
            arr.splice(index, 1 );
        }

        return arr;
    }

    onSelect = (value) => {
        const { onValueChange } = this.props;
        var nextValues = this.state.values;
        var nextNewValues = this.state.newValues;

        if (parseInt(value).toString() === value) {
            nextValues.push(value);
        }
        else {
            nextNewValues.push(value);
        }

        this.setState({
            values: nextValues,
            newValues: nextNewValues,
            value: nextValues.concat(nextNewValues)
        })
                
        onValueChange(nextValues, nextNewValues);
    }

    onDeselect = (value) => {
        const { onValueChange } = this.props;
        var nextValues = this.state.values;
        var nextNewValues = this.state.newValues;

        if (parseInt(value).toString() === value) {
            nextValues = this.removeByValue(nextValues, value);
        }
        else {
            nextNewValues = this.removeByValue(nextNewValues, value);
        }

        this.setState({
            values: nextValues,
            newValues: nextNewValues,
            value: nextValues.concat(nextNewValues)
        })
                
        onValueChange(nextValues, nextNewValues);
    }

    onFilterOption = (inputValue, option) => {
        if (typeof option.props.title !== "string"){
            return option.props.title.props.children[0].includes(inputValue);
        }
        if (option.props.title.includes(inputValue)) {
            return true;
        }
        return false;
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

            var valuesToShow = this.state.value;

            var allOptions = options.concat(this.state.newValues.map((value) => {
                return {
                    value: value,
                    label: (<b>{value} <Badge count={0} status="success" style={{ backgroundColor: '#52c41a' }}/></b>)
                };
            })); 

            mainElement = (
                <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    onChange={this.onChange}
                    tokenSeparators={[',']}
                    defaultValue={labelValues}
                    disabled={readOnly}
                    onSelect={this.onSelect}
                    onDeselect={this.onDeselect}
                    value={valuesToShow}
                    filterOption={this.onFilterOption}
                  >
                    {this.renderChildren(allOptions, this.state.newValues)}
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
