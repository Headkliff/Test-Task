import React, { Component } from 'react';
import {Mention} from 'antd';
const { toString, toContentState } = Mention;

export default class TemplateField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            value: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        const { reset, onReset } = nextProps;
        if (reset) {
            onReset();
        }
    }

    onSearchChange = (value, trigger) => {
        const { tags } = this.props;
        const dataSource = tags;

        var leftSuggestions = dataSource.filter(item => item.toLowerCase().indexOf(value.toLowerCase()) !== -1);

        var addExistingValue = dataSource.some(item => value.toLowerCase().startsWith(item.toLowerCase()) && value.toLowerCase() !== item.toLowerCase());

        if (addExistingValue) {
            leftSuggestions.push(value);
        }

        this.setState({
            suggestions: leftSuggestions,
        });
    }

    onChange = (val) => {
        const { onValueChange } = this.props;

        this.setState({
            value: toString(val)
        });

        onValueChange(toString(val));
    }

    render() {
        const { input, meta, title, glyphicon, required, name, options } = this.props;
        const { value } = this.state;

        var metaData = meta || {};
        const className = metaData.touched && metaData.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>

                <Mention
                    style={{ width: '100%', height: 500 }}
                    onChange={this.onChange}
                    placeholder="Input $ to mention template words"
                    prefix={['$']}
                    onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                    multiLines
                    notFoundContent="No items is found"
                    autoFocus={true}
                />

                { metaData.touched && metaData.error && <span className="help-block validation-message validation-message-select">{ metaData.error }</span> }
            </div>
        );
    }
}
