import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import GoogleOauth from './SocialLogin/GoogleOauth';

export default class SignUpBootStrap4Col extends Component {
  state = {
    autoLoad: false
  };

  onGoogleClick = () => {
    this.setState({
      autoLoad: true
    });
  };
  render() {
    return (
      // col-lg-4    means 4 columns are defined in main HomeSection file and not here ..
      <div>
        <div>
          <div
            class=" text-center card-form bg-info border-primary"
            style={{ borderRadius: '5px' }}
          >
            <div class="card-body">
              <h3 class="text-white display-4">Sign Up</h3>
              <p class="text-dark lead">Please fill out the form to register</p>
              <form class="card-form">
                <div class="form-group ">
                  <input
                    type="text"
                    class="form-control form-control-lg mb-1"
                    placeholder="Name "
                  />
                  <input
                    type="text"
                    class="form-control form-control-lg mb-1"
                    placeholder="Email "
                  />
                  <input
                    type="password"
                    class="form-control form-control-lg mb-1"
                    placeholder="Password "
                  />
                  <input
                    type="password"
                    class="form-control form-control-lg mb-3"
                    placeholder="Password "
                  />
                  <button
                    type="submit"
                    class="btn btn-secondary btn-block text-white"
                  >
                    {' '}
                    Submit{' '}
                  </button>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
