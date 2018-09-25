import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NewPostFormImlementation from '../components/newPost/NewPostForm';
import { Redirect } from 'react-router';

import * as PostActions from '../actions/post/actions';

class NewPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            needRedirect: false
        };
    }

    onSubmit = (postData) => {
        this.props.postActions.createPost(postData, this.redirect);
    }

    redirect =()=> {
        this.setState({
            needRedirect: true
        });
    }

    render() {      
        if (this.state.needRedirect) {
            return <Redirect to={{
                pathname: `/posts`
              }}/>
        }

        const newPostFormPayload = {
            onSubmit: this.onSubmit
        }

        return (
            <div className="col-md-8 col-sm-offset-2">
                <NewPostFormImlementation newPostFormPayload={newPostFormPayload} />
            </div>
        );
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
        postActions: bindActionCreators(PostActions, dispatch)
    })
)(NewPost);
