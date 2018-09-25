import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PostForm from '../components/post/PostForm';
import { Link } from 'react-router-dom';

import * as postsActions from '../actions/posts/actions';

import { Spin } from 'antd';

class Posts extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {     
        this.props.postsActions.getPosts();
    }

    renderPosts =()=>{
        return(
          this.props.posts.map(function(post, i)
          { 
              return <PostForm key={i} post={post}/>
          })  
        );
    }

    renderNotDataMessage =()=>{
        return(
            <div className="not-found-message">
                <h4>Posts is not found.</h4> 
            </div>
        );
    }

    render() {
        return (  
            <div>   
                <div className="row">
                    <div className="col-md-6 col-sm-offset-3">
                        {
                           this.props.posts.length === 0 && this.renderNotDataMessage()
                        }
                        {
                           this.renderPosts()
                        }       
                    </div>        
                </div>         
            </div>
        );
    }
}

export default connect(
    state => ({
        posts: state.posts.get('posts'),
    }),
    dispatch => ({
        postsActions: bindActionCreators(postsActions, dispatch),
    })
)(Posts);
