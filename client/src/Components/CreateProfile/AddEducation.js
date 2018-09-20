import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import InputGroup from '../Common/InputGroup';
import TextFieldGroup from '../Common/TextFieldGroup';
import TextAreaFieldGroup from '../Common/TextAreaFieldGroup';
import { addEducation } from '../../actions/profileAction';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      disabled: false,
      errors: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.error });
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onCheck = () => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center"> Add Education</h1>
              <p className="lead text-center">
                Add any School, BootCamp or Course you want to
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <InputGroup
                  type="text"
                  placeholder="* school"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  icon="far fa-building"
                />
                <InputGroup
                  type="text"
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  icon="fas fa-certificate"
                />
                <InputGroup
                  type="text"
                  placeholder="Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  icon="fas fa-graduation-cap "
                />
                <h6>From Date</h6>
                <InputGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  placeholder="From Date"
                  icon="fas fa-calendar"
                />
                <h6>To Date</h6>
                {this.state.disabled ? (
                  <TextFieldGroup
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    placeholder="From Date"
                    // icon="fas fa-calendar"
                    disabled="disabled"
                  />
                ) : (
                  <InputGroup
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    placeholder="From Date"
                    icon="fas fa-calendar"
                  />
                )}

                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="JOB Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  info="Tell us about the position"
                />

                <button type="submit" className="btn btn-info btn-block mt-3">
                  Submit
                </button>
              </form>
              {errors && (
                <div className="text-center  text-danger text-muted text-sm mt-2">
                  {/* <strong>{errors}</strong> */}
                  <i className="fas fa-exclamation-triangle text-danger" />
                  {errors}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    profile: state.profile,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
