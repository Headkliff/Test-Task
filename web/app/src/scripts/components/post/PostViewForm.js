import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import Comment from '../comment/Comment'
import NewCommentFormImlementation from '../newComment/NewCommentForm'

import { Button } from 'antd';

class PostViewForm extends Component  {
    constructor(props) {
        super(props);
    };

    renderComments =(comments)=> {
        return (                
            comments.map(function(comment, i) { 
                return <Comment key={i} comment={comment} />
            }              
        ));
    }

    render() {
        const {
            Title,
            Content,
            PostId,
            DateTime,
            NumberOfComments,
            Comments
        } = this.props.postViewPayload.post;   

        return(
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">  
                        <div className="row">  
                            <div className="col-md-10">
                                <h3 className="panel-title">{Title}</h3><br />  
                                <small>Posted {DateTime}</small>   
                            </div>
                            <div className="col-md-2">
                                <Link to={`/posts`}>
                                    <Button type="primary" icon="left-circle" size="large">
                                        Back
                                    </Button>
                                </Link> 
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">                                  
                        {Content}
                    </div>
                    <div className="panel-footer"> 
                        <h3 className="panel-title">Comments({NumberOfComments})</h3><br />
                        { this.renderComments(Comments) }           
                    </div>
                </div>
                <div className="panel panel-default">            
                    <div className="panel-body">                                  
                        <NewCommentFormImlementation onSubmit={this.props.postViewPayload.onSubmit} />
                    </div>
                </div>
            </div>
          );
      }
};

export default reduxForm({
  form: 'PostViewForm',  // a unique identifier for this formv  
})(PostViewForm)
