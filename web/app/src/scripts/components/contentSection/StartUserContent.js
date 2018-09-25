import React, { Component } from 'react';
import ContentBody from './ContentBody'

export default class StartUserContent extends Component {
    render() {

        return (
            <div className="row">
                <div id="user-primary" className="col-md-10">
                    <ContentBody>
                        {this.props.children}
                    </ContentBody>
                </div>
            </div>
        );
    }
}
