import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

import TextField from '../newUser/fields/TextField';
import AreaField from '../newUser/fields/AreaField';

class NewCommentFormImlementation extends Component  {
    constructor(props) {
        super(props);
    }

    onSubmit = (data) => {
        const handleSubmitData = this.props.onSubmit;
        handleSubmitData(data, this.onReset);
    }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="panel panel-default">
                    <div className="panel-body">                                  
                        <Field name="userName" component={TextField} title="Your name" glyphicon="glyphicon glyphicon-list-alt" required={true} />
                        <Field name="text" component={AreaField} title="Comment" glyphicon="glyphicon glyphicon-list-alt" required={true} />
                    </div>
                    <div className="panel-footer"> 
                        <Button type="primary" htmlType="submit">
                            <Icon type="check" /> Send comment
                        </Button>       
                    </div>
                </div>
            </form>
          );
      }
};

export default reduxForm({
  form: 'NewCommentForm',  // a unique identifier for this form
})(NewCommentFormImlementation)
