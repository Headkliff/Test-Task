import React, { Component, PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Icon } from 'antd';

import TextField from '../newUser/fields/TextField';
import AreaField from '../newUser/fields/AreaField';

class NewPostFormImlementation extends Component  {
    static propTypes = {
        newPostFormPayload: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
    }

    onSubmit = (data) => {
        const handleSubmitData = this.props.newPostFormPayload.onSubmit;
        handleSubmitData(data, this.onReset);
    }

    render() {
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="panel panel-default">
                    <div className="panel-heading">  
                        <Link to={`/posts`}>
                            <Button type="primary" icon="left-circle" size="large">
                                Back
                            </Button>
                        </Link>  
                    </div>
                    <div className="panel-body">                                  
                        <Field name="title" component={TextField} title="Title" glyphicon="glyphicon glyphicon-list-alt" required={true} />
                        <Field name="content" component={AreaField} title="Сontent" glyphicon="glyphicon glyphicon-list-alt" required={true} />
                    </div>
                    <div className="panel-footer"> 
                        <Button type="primary" htmlType="submit">
                            <Icon type="check" /> Create post
                        </Button>       
                    </div>
                </div>
            </form>
          );
      }
};

export default reduxForm({
  form: 'NewPostForm',  // a unique identifier for this form
})(NewPostFormImlementation)
