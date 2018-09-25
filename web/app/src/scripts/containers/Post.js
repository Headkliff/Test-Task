import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PostViewForm from '../components/post/PostViewForm';
import { withRouter } from 'react-router';

import * as PostActions from '../actions/post/actions';
import * as CommentActions from '../actions/comment/actions';

import { Spin } from 'antd';

class Post extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {   
        const postId = this.props.match.params.id;
        this.props.postActions.getPost(postId);
    }

    renderPost =()=>{
        if(this.props.post.length == 0){
            return;
        }

        const postViewPayload = {
            onSubmit: this.onSubmitCommentAdd,
            post: this.props.post
        }

        return(<PostViewForm postViewPayload={postViewPayload}/>);
    }

    onSubmitCommentAdd = (commentData) => {
        commentData.postId = this.props.match.params.id;
        this.props.commentActions.createComment(commentData, this.redirect);
    }

    redirect =()=> {
        this.props.postActions.getPost(this.props.match.params.id);
    }

    render() {
        return (  
            <div>
                <div className="row">
                    <div className="col-md-6 col-sm-offset-3">
                        {this.renderPost()}       
                    </div>           
                </div>         
            </div>
        );
    }
}

var connectedPost= connect(
    state => ({
        post: state.post.get('post'),
    }),
    dispatch => ({
        postActions: bindActionCreators(PostActions, dispatch),
        commentActions: bindActionCreators(CommentActions, dispatch),
    })
)(Post);

export default withRouter(connectedPost)
