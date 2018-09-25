import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import {createValueFromString} from 'react-rte';

export default class RichTextField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: (props.initValue && createValueFromString(props.initValue, 'html')) || RichTextEditor.createEmptyValue(),
        }
    }

    componentWillReceiveProps(nextProps) {
        const { reset, onReset } = nextProps;
        if (reset) {
            this.setState({
                value: (nextProps.initValue && createValueFromString(nextProps.initValue, 'html')) || RichTextEditor.createEmptyValue()
            });
            onReset();
        }
    }

    onChange = (val) => {
        const { onValueChange } = this.props;

        this.setState({
            value: val
        });

        onValueChange(val.toString('html'));
    }

    render() {
        const { input, meta, title, glyphicon, required, name, options, readOnly } = this.props;
        const { value } = this.state;

        var metaData = meta || {};
        const className = metaData.touched && metaData.error ? 'has-error' : '';

        var extraClass = required ? "required" : "";

        if (readOnly) {
            return (
                <div className="form-group has-feedback">
                    <label className={extraClass}>{title}: </label>
                    <div dangerouslySetInnerHTML={{__html: this.props.initValue}}>
                    </div>
                </div>
            )
        }

        return (
            <div className="form-group has-feedback">
                <label className={extraClass}>{title}: </label>

                <RichTextEditor
                    value={this.state.value}
                    onChange={this.onChange}
                  />

                { metaData.touched && metaData.error && <span className="help-block validation-message validation-message-select">{ metaData.error }</span> }
            </div>
        );
    }
}
