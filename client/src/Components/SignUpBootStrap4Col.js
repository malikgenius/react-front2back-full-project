import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { registerUser, LoginModalOpen } from '../actions/authAction';
import { connect } from 'react-redux';
// import GoogleOauth from './SocialLogin/GoogleOauth';

class SignUpBootStrap4Col extends Component {
  state = {
    autoLoad: false,
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: ''
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      // console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors.error });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // onFocus clear all the errors, while user is typing in email or password, we dont need to show them old error.
  onFocus = () => {
    this.setState({
      errors: ''
    });
  };

  onLoginModalOpen = () => {
    this.props.LoginModalOpen();
    this.setState({
      errors: ''
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log(e);
    // confirm password match test ..
    if (this.state.password !== this.state.password2) {
      return this.setState({ errors: 'Passwords do not match' });
    }
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    // we can take our history to Action through this way, its different than Andrew Mead React way.
    this.props.registerUser(newUser, this.props.history);
    this.setState({
      errors: ''
    });
  };

  onGoogleClick = () => {
    this.setState({
      autoLoad: true,
      errors: ''
    });
  };
  render() {
    const { errors } = this.state;
    return (
      // col-lg-4    means 4 columns are defined in main HomeSection file and not here ..
      <div>
        <div>
          <div
            className=" text-center card-form bg-info border-primary"
            style={{ borderRadius: '5px' }}
          >
            <div className="card-body">
              <h3 className="text-white display-4">Sign Up</h3>
              <p className="text-dark lead">Please fill the form to register</p>
              <form className="card-form" onSubmit={this.onSubmit}>
                <div className="form-group ">
                  <input
                    name="name"
                    type="text"
                    className="form-control form-control-lg mb-1"
                    placeholder="Name "
                    value={this.state.name}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                  />
                  <input
                    name="email"
                    type="email"
                    className="form-control form-control-lg mb-1"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                  />
                  <input
                    name="password"
                    type="password"
                    className="form-control form-control-lg mb-1"
                    placeholder="Password "
                    value={this.state.password}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                  />
                  <input
                    name="password2"
                    type="password"
                    className="form-control form-control-lg mb-3"
                    placeholder="Password "
                    value={this.state.password2}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                  />
                  <button
                    type="submit"
                    className="btn btn-secondary btn-block text-white"
                  >
                    {' '}
                    Submit{' '}
                  </button>
                  {errors ? (
                    <div className="text-center text-light  text-sm mt-2">
                      <i className="fas fa-exclamation-triangle text-danger" />
                      {/* <strong>{errors}</strong> */} {errors}
                    </div>
                  ) : (
                    ''
                  )}
                </div>

                <div>
                  <p>------------Or-------------</p>

                  <Link to="/google" style={{ textDecoration: 'none' }}>
                    <button
                      onClick={this.onGoogleClick}
                      // onClick={this.onGoogleLogin}
                      // href="/api/users/google"
                      className="btn btn-danger btn-block mb-2"
                    >
                      <span className="fa fa-google mr-2 " />
                      Google
                    </button>
                  </Link>

                  <Link to="/facebook" style={{ textDecoration: 'none' }}>
                    <button className="btn btn-primary btn-block">
                      <span className="fa fa-facebook mr-2 " />
                      Facebook
                    </button>
                  </Link>

                  {/* <GoogleOauth autoLoad={this.state.autoLoad} /> */}
                </div>
              </form>
              <div className=" mb-2">
                have an account ?
                <button
                  onClick={this.onLoginModalOpen}
                  className="btn btn-link border-0  lead text-white"
                >
                  {' '}
                  <h5>Sign In</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { registerUser, LoginModalOpen }
)(withRouter(SignUpBootStrap4Col));
