import React, { Component } from 'react';
import { withRouter } from 'react-router';

class ContentBody extends Component {

    constructor(props) {
        super(props);

        var currentUrl = props.match.path;

        this.state = {
            currentUrl: currentUrl
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.path != nextProps.match.path) {
            const currentUrl = nextProps.match.path;
            this.setState({
                currentUrl: currentUrl
            })
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(ContentBody)
