import React, { Component,PropTypes } from 'react';
import { Field, reduxForm, change, reset, touch, initialize } from 'redux-form';
import {validateIviteUserDraft} from '../../utils/validation-utils';
import InvitationPassword from '../invitation/InvitationPassword';
import InvitationPasswordConfirmation from '../invitation/InvitationPasswordConfirmation';
import Select from 'react-select';
import * as countries from 'country-list';

import TextField from './fields/TextField';
import NumberField from './fields/NumberField';
import CheckBoxField from './fields/CheckBoxField';
import SelectField from './fields/SelectField';
import SolidSelectField from './fields/SolidSelectField';

const validate = values => {

    let { errors } = validateIviteUserDraft(values);
    let validationErrors = {};

    errors.forEach( (error, i) => {
        validationErrors[error.property] = error.message;
    });

    return validationErrors;
};

class NewUserFromCsvFormImlementation extends Component  {
    static propTypes = {
        newUserFromCsvFormPayload: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            showGenderName: false,
            sendInvitation: false,
            resetGender: false,
            resetRole: false,
            resetCompany: false,
            resetCountry: false,
            initData: false,
            dispatched: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.initData) {
            if (nextProps.newUserFromCsvFormPayload.csvFileUser) {
                this.setState({
                    initData: true
                });

                this.props.dispatch(initialize('NewUserFromCsvForm', nextProps.newUserFromCsvFormPayload.csvFileUser));
                
                this.props.dispatch(change('NewUserFromCsvForm', 'roleId', 3));

                if (!nextProps.newUserFromCsvFormPayload.csvFileUser.companyId){
                    this.setState({
                        company: 1
                    });
                    this.props.dispatch(change('NewUserFromCsvForm', 'companyId', 1));
                }
                else {
                    this.setState({
                        company: nextProps.newUserFromCsvFormPayload.csvFileUser.companyId
                    });
                    this.props.dispatch(change('NewUserFromCsvForm', 'companyId', nextProps.newUserFromCsvFormPayload.csvFileUser.companyId));
                }

                if (!nextProps.newUserFromCsvFormPayload.csvFileUser.gender){
                    this.setState({
                        gender: 1
                    });
                    this.props.dispatch(change('NewUserFromCsvForm', 'gender', 1));
                }
                else {
                    this.setState({
                        gender: nextProps.newUserFromCsvFormPayload.csvFileUser.gender
                    });
                    this.props.dispatch(change('NewUserFromCsvForm', 'gender', nextProps.newUserFromCsvFormPayload.csvFileUser.gender));
                    if (nextProps.newUserFromCsvFormPayload.csvFileUser.gender === 3) {
                        this.setState({
                            showGenderName: true
                        });
                    }
                    else {
                        this.setState({
                            showGenderName: false
                        }); 
                    }
                }

                if (!nextProps.newUserFromCsvFormPayload.csvFileUser.homeCountry){
                    this.setState({
                        homeCountry: 1
                    });
                    this.props.dispatch(change('NewUserFromCsvForm', 'homeCountry', 1));
                }
                else {
                    this.setState({
                        homeCountry: nextProps.newUserFromCsvFormPayload.csvFileUser.homeCountry
                    });
                    this.props.dispatch(change('NewUserFromCsvForm', 'homeCountry', nextProps.newUserFromCsvFormPayload.csvFileUser.homeCountry));
                }
            }
        }
    }

    onGenderChange = (val) => {
        this.props.dispatch(change('NewUserFromCsvForm', 'gender', val.value));

        if (val.value === 3) {
            this.setState({
                showGenderName: true
            });
        }
        else {
            this.setState({
                showGenderName: false
            });
        }
    }

    onCountryChange = (val) => {
        this.props.dispatch(change('NewUserFromCsvForm', 'homeCountry', val.label));
        this.setState({
            country: val && val.value
        });
    }

    onCompanyChange = (val) => {
        this.props.dispatch(change('NewUserFromCsvForm', 'companyId', val.value));
        this.setState({
            company: val.value
        });
    }

    onReset = () => {
        this.setState({
            dispatched: true
        });
        this.props.newUserFromCsvFormPayload.onRedirect();
    }

    onSubmit = (data) => {
        const handleSubmitData = this.props.newUserFromCsvFormPayload.onSubmit;
        handleSubmitData(data, this.onReset);
    }

    onRoleChange = (val) => {
        val = (val && val.value) || 3;
        this.props.dispatch(change('NewUserFromCsvForm', 'roleId', val));
        this.props.dispatch(touch('NewUserFromCsvForm', 'roleId'));
        this.setState({
            sendInvitation: val !== 3,
            role: val
        });
    }

    onGenderReset = () =>{
        this.setState({
            showGenderName: false,
            resetGender: false,
        });
    }

    onCountryReset = () =>{
        this.setState({
            resetCountry: false,
        });
    }

    onCompanyReset = () =>{
        this.setState({
            resetCompany: false,
        });
    }

    onRoleReset = () =>{
        this.setState({
            resetRole: false,
        });
    }

    render() {
        const {showGenderName} = this.state;
        const companies = this.props.newUserFromCsvFormPayload.companies;
        const csvFileUser = this.props.newUserFromCsvFormPayload.csvFileUser;
        const usersCsvFileId = this.props.newUserFromCsvFormPayload.usersCsvFileId;

        if (!csvFileUser) {
            return null;
        }

        var options = [
          { value: 1, label: 'Male' },
          { value: 2, label: 'Female' },
          { value: 3, label: 'Not Listed' },
        ];

        var countriesData = countries.default().getNames().map((val) => {
            return {
                value: val,
                label: val
            }
        });

        var companiesData = companies.map((val) => {
            return {
                value: val.id,
                label: val.name
            }
        });

        var roles = [
          { value: 1, label: 'Administrator' },
          { value: 2, label: 'Full User' },
          { value: 3, label: 'Email Only' }
        ];

        return(
              <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

                  <div className="panel panel-default">
                      <div className="panel-body">
                        <span className="required"> - Fields with a </span><span> symbol are required</span>
                      </div>
                  </div>

                  <div className="panel panel-default">
                      <div className="panel-heading">Personal Data</div>

                      <div className="panel-body">
                          <Field name="firstName" component={TextField} title="First Name" glyphicon="glyphicon-user" required={true} />
                          <Field name="lastName" component={TextField} title="Last Name" glyphicon="glyphicon-user" required={true} />

                          <Field name="gender"
                                component={SelectField}
                                title="Gender"
                                glyphicon="glyphicon-adjust"
                                required={false}
                                options={options}
                                onValueChange={this.onGenderChange}
                                initValue={csvFileUser.gender}
                                reset={this.state.resetGender}
                                onReset={this.onGenderReset}/>

                          <Field name="genderName" component={TextField} title="Gender Name" glyphicon="glyphicon-adjust" required={false} hidden={!showGenderName}/>
                          <Field name="nationality" component={TextField} title="Nationality" glyphicon="glyphicon-home" required={false} />
                      </div>
                  </div>

                  <div className="panel panel-default">
                      <div className="panel-heading">Contacts</div>
                      <div className="panel-body">

                          <Field name="email" component={TextField} title="Email" glyphicon="glyphicon-email" required={true} />
                          <Field name="officePhone" component={TextField} title="Office Phone" glyphicon="glyphicon-phone" required={false} />
                          <Field name="mobilePhone" component={TextField} title="Mobile Phone" glyphicon="glyphicon-phone" required={false} />

                          <Field name="homeCountry"
                                component={SelectField}
                                title="Country"
                                glyphicon="glyphicon-home"
                                required={false}
                                options={countriesData}
                                onValueChange={this.onCountryChange}
                                initValue={csvFileUser.homeCountry}
                                reset={this.state.resetCountry}
                                onReset={this.onCountryReset}/>

                          <Field name="homeState" component={TextField} title="State/Province" glyphicon="glyphicon-home" required={false} />
                          <Field name="homeCity" component={TextField} title="City" glyphicon="glyphicon-home" required={false} />
                      </div>
                  </div>

                  <div className="panel panel-default">
                      <div className="panel-heading">Education and Work</div>
                      <div className="panel-body">

                          <Field name="companyId"
                              component={SolidSelectField}
                              title="Company"
                              glyphicon="glyphicon-eye-open"
                              required={true}
                              options={companiesData}
                              onValueChange={this.onCompanyChange}
                              initValue={csvFileUser.companyId}
                              reset={this.state.resetCompany}
                              onReset={this.onCompanyReset}/>

                          <Field name="jobTitle" component={TextField} title="Job Title" glyphicon="glyphicon-briefcase" required={false} />
                          <Field name="yearsAtCompany" component={NumberField} title="Years at Company" glyphicon="glyphicon-briefcase" required={false} />
                          <Field name="educationLevel" component={TextField} title="Education Level" glyphicon="glyphicon-education" required={false} />
                          <Field name="educationFocus" component={TextField} title="Education Focus" glyphicon="glyphicon-education" required={false} />

                      </div>
                  </div>

                  <div className="panel panel-default">
                      <div className="panel-heading">Profile Preference</div>
                      <div className="panel-body">
                            <Field name="roleId"
                                component={SolidSelectField}
                                title="Role"
                                glyphicon="glyphicon-eye-open"
                                required={true}
                                options={roles}
                                onValueChange={this.onRoleChange}
                                initValue={3}
                                reset={this.state.resetRole}
                                onReset={this.onRoleReset}/>
                      </div>
                  </div>

                  <div className="panel panel-default">
                      <div className="panel-body">
                          <input type="submit" className="btn btn-primary btn-add-project btn-inovo-icon" value={this.state.sendInvitation ? "Invite User" : "Create User"} disabled={this.props.invalid || this.props.isFetching}/>
                      </div>
                  </div>
              </form>
          );
      }
};

export default reduxForm({
  form: 'NewUserFromCsvForm',  // a unique identifier for this form
  validate
})(NewUserFromCsvFormImlementation)
