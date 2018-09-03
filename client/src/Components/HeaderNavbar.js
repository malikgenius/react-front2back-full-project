import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem
} from 'reactstrap';
import { logoutUser, loginUser, loginSocialUser } from '../actions/authAction';

class HeaderNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      collapsed: true,
      modal: false
    };
  }

  componentDidMount = () => {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  };
  // below will check if props changes, when logged out it will trigger and redirect
  componentWillReceiveProps = nextProps => {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  };

  // Login User in Modal ...
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const User = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(User);
  };

  // Navbar Toggle
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    // Check if authenticated or not.
    const authLinks = (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav>
          {user.photo ? (
            <a>
              <img
                className="rounded-circle"
                src={user.photo}
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
                title={user.name}
              />{' '}
              {user.name}
            </a>
          ) : (
            <a>
              <img
                className="rounded-circle"
                src="/img/placeholder.jpg"
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
                title="You must have a Gravatar connected to your email to display an image"
              />{' '}
              {user.name}
            </a>
          )}
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            {user.method === 'local' ? (
              <Link
                style={{
                  textDecoration: 'none',
                  fontWeight: '600',
                  color: 'gray'
                }}
                to="/forgot"
              >
                Change Password{' '}
              </Link>
            ) : (
              ''
            )}
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            {user.photo ? (
              <a
                href=""
                onClick={this.onLogoutClick}
                className="Link"
                style={{
                  textDecoration: 'none',
                  fontWeight: '600',
                  color: 'gray'
                }}
              >
                <img
                  className="rounded-circle img-fluid"
                  src={user.photo}
                  alt={user.name}
                  style={{ width: '25px', marginRight: '5px' }}
                  title="You must have a Gravatar connected to your email to display an image"
                />
                Sign Out
              </a>
            ) : (
              <a
                href=""
                onClick={this.onLogoutClick.bind(this)}
                className="nav-link text-right"
                style={{
                  textDecoration: 'none',
                  fontWeight: '600',
                  color: 'gray'
                }}
              >
                <img
                  className="rounded-circle float-left"
                  src="/img/placeholder.jpg"
                  alt={user.name}
                  style={{ width: '25px', marginRight: '5px' }}
                  title="You must have a Gravatar connected to your email to display an image"
                />
                Sign Out
              </a>
            )}{' '}
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );

    const guestLinks = (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Already member ?
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            {/* <Link
              to="/"
              style={{
                textDecoration: 'none',
                fontWeight: '600',
                color: 'gray'
              }}
            >
              Sign In
            </Link> */}
            <NavItem
              style={{
                textDecoration: 'none',
                fontWeight: '600',
                color: 'gray',
                cursor: 'pointer'
              }}
              onClick={this.toggle}
            >
              {' '}
              Sign In
            </NavItem>
          </DropdownItem>
          <DropdownItem>
            <Link
              to="/signup"
              style={{
                textDecoration: 'none',
                fontWeight: '600',
                color: 'gray'
              }}
            >
              Sign Up
            </Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <Link
              to="/forgot"
              style={{
                textDecoration: 'none',
                fontWeight: '600',
                color: 'gray'
              }}
            >
              forgot password
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
    return (
      <div>
        <div>
          <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
            <div className="container">
              <Link to="/#home-page" className="navbar-brand">
                T3CH GeeGs
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>

              <div className="collapse navbar-collapse " id="navbarCollapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/#explore">
                      Explore
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/#footer">
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    {isAuthenticated ? authLinks : guestLinks}
                    {/* <div
                      onClick={this.toggle}
                      class="nav-link"
                      style={{ cursor: 'pointer' }}
                    >
                      Log in
                    </div> */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            id="contact-modal"
            className="bg-primary"
            style={{ color: 'green' }}
          >
            <ModalBody className="bg-dark">
              <div
                className=" text-center card-form bg-dark"
                style={{ borderRadius: '5px' }}
              >
                <div className="card-body">
                  <h3 className="text-white display-4 mb-5">Log in</h3>

                  <form className="card-form" onSubmit={this.onSubmit}>
                    <div className="form-group text-light">
                      <input
                        name="email"
                        type="email"
                        className="form-control form-control-lg mb-2 bg-dark text-light"
                        placeholder="Email "
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      <input
                        name="password"
                        type="password"
                        className="form-control form-control-lg mb-4 bg-dark text-light"
                        placeholder="Password "
                        value={this.state.password}
                        onChange={this.onChange}
                      />

                      <button
                        type="submit"
                        className="btn btn-outline-secondary btn-block text-white border-light "
                      >
                        {' '}
                        Log in{' '}
                      </button>
                    </div>

                    <div>
                      <p className="text-white lead mb-4">
                        <br />
                        use your social account to login
                      </p>

                      <Link to="/google" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-danger btn-block mb-2">
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
                    </div>
                  </form>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, loginUser, loginSocialUser }
)(withRouter(HeaderNavbar));
