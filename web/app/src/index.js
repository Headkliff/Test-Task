import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import configureStore from './scripts/store/configureStore';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import "./styles/assets/css/antd.css";
import './styles/custom-styles.css';
import "./styles/main.css";

import Posts from './scripts/containers/Posts';
import Post from './scripts/containers/Post';
import NewPost from './scripts/containers/NewPost';

import App from './App';

let store = configureStore();

let renderUserComponent = (component) => {    
    return (
        <App>
            {component}
        </App>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <LocaleProvider locale={enUS}>
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route path="/posts" render={() => renderUserComponent(<Posts />)} exact={true} /> 
                <Route path="/posts/new" render={() => renderUserComponent(<NewPost />)} exact={true} />
                <Route path="/posts/:id" render={() => renderUserComponent(<Post />)} exact={true} /> 
                <Route path="/" render={() => renderUserComponent(<Posts />)} exact={true} /> 
                <Route path="*" name="" />
            </Switch>
        </Router>
        </LocaleProvider>
    </Provider>,
    document.getElementById('root')
);
