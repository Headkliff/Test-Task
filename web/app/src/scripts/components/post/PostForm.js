import React, { Component,PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostFormImlementation extends Component  {
    constructor(props) {
        super(props);
    };

    render() {
        const {
            Title,
            Content,
            PostId,
            DateTime,
            NumberOfComments
        } = this.props.post;
        
        return(
            <div className="panel panel-default">
                <div className="panel-heading">  
                    <div className="row">  
                        <div className="col-md-9">
                            <h3 className="panel-title">
                                <Link to={`/posts/${PostId}`}>{Title}</Link>                            
                            </h3>   
                        </div>
                        <div className="col-md-3">
                            <small>{DateTime}</small>   
                        </div>
                    </div>
                </div>
                <div className="panel-body">                                  
                    {Content}
                </div>
                <div className="panel-footer">   
                <div className="row">  
                    <div className="col-md-10">
                        <Link to={`/posts/${PostId}`}>More...</Link>
                    </div>
                    <div className="col-md-2">
                        Comments <span className="badge">{NumberOfComments}</span>
                    </div>
                </div>               
                </div>
            </div>
          );
      }
};

export default reduxForm({
  form: 'PostForm',  // a unique identifier for this formv  
})(PostFormImlementation)
