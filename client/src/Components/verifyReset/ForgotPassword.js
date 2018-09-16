import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetPassword } from '../../actions/authAction';
import InputGroup from '../Common/InputGroup';

class ForgotPassword extends Component {
  state = {
    email: '',
    errors: '',
    success: ''
  };

  // componentDidMount = () => {
  //   if (this.props.errors) {
  //     this.setState({ errors: this.props.errors.error });
  //   }
  //   if (this.props.success) {
  //     this.setState({ success: this.props.success.success });
  //   }
  // };
  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      // console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors.error });
    }
    if (this.props.success) {
      this.setState({ success: this.props.success.success });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFocus = () => {
    this.setState({
      errors: '',
      success: undefined
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const Email = {
      email: this.state.email
    };
    // we can take our history to Action through this way, its different than Andrew Mead React way.
    this.props.resetPassword(Email, this.props.history);
  };

  render() {
    const { errors, success } = this.state;
    return (
      <div className=" container ">
        <div className="row">
          {/* <div className="col-md-4 col-lg-2" /> */}
          <div className="col-md-8 m-auto  text-center">
            <div className="card pt-5 border-0">
              <div className="card-body">
                <h3 className="text-dark display-4 mb-5">
                  forgot your password ?{' '}
                </h3>

                <form className="card-form" onSubmit={this.onSubmit}>
                  <div className="form-group text-light">
                    <InputGroup
                      placeholder="email here "
                      name="email"
                      type="email"
                      icon="fa fa-at"
                      value={this.state.email}
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                    />
                    {/* <InputGroup
                      name="email"
                      type="email"
                      className="form-control form-control-lg mb-2 bg-light text-dark"
                      placeholder="your email here "
                      value={this.state.email}
                      onChange={this.onChange}
                      onFocus={this.onFocus}
                    /> */}
                    <button
                      type="submit"
                      className="btn btn-secondary btn-block text-white border-light "
                    >
                      {' '}
                      Send{' '}
                    </button>
                    {errors ? (
                      <div className="text-center  text-danger text-sm">
                        {/* <strong>{errors}</strong> */}
                        {errors}
                      </div>
                    ) : (
                      ''
                    )}
                    {success ? (
                      <div className="text-center  text-success text-sm">
                        {/* <strong>{errors}</strong> */}
                        {success}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div className="col-md-4 " /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(ForgotPassword));
