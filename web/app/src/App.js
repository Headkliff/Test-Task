import React, { Component } from 'react';
import StartUserContent from './scripts/components/contentSection/StartUserContent';
import StartTop from './scripts/components/header/StartTop';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import 'moment/min/locales';
import moment from 'moment';
import { message } from 'antd';


export default class App extends Component {
    componentWillMount() {
        moment.locale(window.navigator.userLanguage || window.navigator.language);
    }

    onBodyClick = () => {
        message.destroy();
    }

    onGetDrillPath = (data) => {
        this.props.drillPathActions.getDrillPath(data);
    }

    render() {
        var appPayload = this.props.appPayload;

        let userContent = (
            <StartUserContent>
                {this.props.children}
            </StartUserContent>
        );

        return (
            <div id="page" onClick={this.onBodyClick}>
                <StartTop  />
                <div >
                    {userContent}
                </div>
            </div>
        );
    }
};
