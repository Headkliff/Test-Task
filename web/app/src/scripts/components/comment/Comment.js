import React, { Component,PropTypes } from 'react';
import { Field, reduxForm, change, reset, touch, initialize, blur, startSubmit, focus } from 'redux-form';
import { Link } from 'react-router-dom';

class CommentFormImplementation extends Component  {
    constructor(props) {
        super(props);
    };

    render() {
        const {
            Text,
            UserName,
        } = this.props.comment;
        
        return(
            <div className="bs-example">
                <blockquote>
                    <p>{ UserName }</p>
                    <small><cite>{ Text } </cite></small>
                </blockquote>
            </div>
          );
      }
};

export default reduxForm({
  form: 'CommentForm',  // a unique identifier for this formv  
})(CommentFormImplementation)
