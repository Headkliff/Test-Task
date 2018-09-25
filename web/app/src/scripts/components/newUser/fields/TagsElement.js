import React, { Component } from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';

export default class TagsElement extends Component {

    constructor (props) {
        super(props);

        this.state = {
            inputVisible: false,
            inputValue: '',
        }
    }

    componentWillMount() {
        var initValues = this.props.initValues || [];
        
        this.setState({
            tags: initValues,
            inputVisible: false,
            inputValue: '',
        })
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
        this.props.onValueChange && this.props.onValueChange(tags);
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }

        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });

        this.props.onValueChange && this.props.onValueChange(tags);
    }

    saveInputRef = input => this.input = input

    render() {
        const { tags, inputVisible, inputValue } = this.state;

        return (
            <div>
                { tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
                }) }
                { inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78, height: 25 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                        className="tag-input"
                    />
                ) }
                {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
            </div>
        );
    }
}
