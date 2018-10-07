import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';
import Animate from 'react-smooth';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  NavLink
} from 'reactstrap';

import {
  logoutUser,
  loginUser,
  loginSocialUser,
  getSuccessReset,
  getLoginErrorReset
} from '../actions/authAction';
import {
  clearCurrentProfile,
  clearAllProfiles
} from '../actions/profileAction';
import InputGroup from './Common/InputGroup';
// import { link } from 'fs';

class HeaderNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
      success: '',
      modal: false,
      menuOpen: false,
      collapse: false,
      dropdown: false
    };
  }

  // below will check if props changes, when logged out it will trigger and redirect
  componentWillReceiveProps = nextProps => {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    if (nextProps.success.success) {
      if (this.state.success !== undefined) {
        this.setState({ success: this.props.success.success });
      }
    }
    // below will close the modal if authenticated
    if (nextProps.success.modal) {
      this.setState({ modal: true });
    }

    if (nextProps.auth.isAuthenticated) {
      this.setState({ modal: false });
    }
    if (nextProps.errors) {
      // Login Errors will show only on login Modal, if we dont do that errors will show on page as well where we load Modal.
      this.setState({ loginErrors: nextProps.errors.loginError });
    }
  };
  // Toast Notifications
  toastNotify = () => {
    // toast('Default Notification !');
    if (this.state.success) {
      toast.success(this.state.success, {
        position: toast.POSITION.TOP_CENTER
      });
    }

    toast.error(this.state.errors, {
      position: toast.POSITION.TOP_LEFT
    });
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
    this.props.getSuccessReset();
    this.props.getLoginErrorReset();
  };

  // Navbar Toggle
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      errors: '',
      email: '',
      password: '',
      success: '',
      menuOpen: false,
      collapse: false
    });
    // reset all the errors if Modal toggle, if user doesnt want to login but just closes the modal after error we
    // need to clean it up so next time user won`t see those errors when open Modal ..
    this.props.getLoginErrorReset();
  };

  // onLogoutClick clearning success and errors & All

  onLogoutClear = () => {
    this.setState({
      errors: '',
      email: '',
      password: '',
      success: '',
      menuOpen: false,
      collapse: false,
      dropdown: false
    });
  };

  // User Dropdown toggle
  toggleDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown });
  };
  // React Burger menu options.
  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };
  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  };
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu = () => {
    this.setState({ menuOpen: false, collapse: false });
  };
  // onFocus clear all the errors, while user is typing in email or password, we dont need to show them old error.
  onFocus = () => {
    this.setState({
      loginErrors: '',
      success: undefined
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.clearAllProfiles();
    this.props.logoutUser(this.props.history);
    this.onLogoutClear();
  };

  showSettings = event => {
    event.preventDefault();
  };

  // Login Button Collapse in Burger Menu
  onCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menuOpen: false });
  }
  render() {
    const { loginErrors, success } = this.state;
    const { isAuthenticated, user } = this.props.auth;

    // Capitalize first letter in words..
    String.prototype.capitalize = function() {
      return this.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });
    };
    // Check if authenticated or not.
    const authLinks = (
      <div style={{ paddingBottom: '20px', marginBottom: '50px' }}>
        <nav
          className="navbar navbar-expand-all bg-dark navbar-dark fixed-top "
          // style={{ opacity: 0.9 }}
        >
          <button
            onClick={this.toggleMenu}
            type="button"
            className="navbar-toggler"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <HashLink
            to="/#home-page"
            className="navbar-brand ml-auto d-none d-md-block text-light"
          >
            T3CH GeeGs
          </HashLink>

          <ul className="nav ml-auto ">
            <li className="nav-item d-none d-md-block">
              <Link
                className="nav-link btn btn-link border-0 text-muted"
                to="/profiles"
              >
                Developers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-link border-0 text-muted"
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>

            <li className="nav-item ">
              {/* trying to animate it but its not working.. check it later. */}
              <Animate
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
                easing="ease-in"
              >
                <div>
                  {user.photo ? (
                    <Dropdown
                      isOpen={this.state.dropdown}
                      toggle={this.toggleDropdown}
                    >
                      <DropdownToggle
                        className=" btn btn-link  rounded rounded-circle p-0"
                        style={{ border: 'none' }}
                      >
                        <img
                          className="rounded-circle text-capitalize"
                          src={user.photo}
                          alt={user.name}
                          style={{ width: '40px' }}
                          title={user.name}
                        />{' '}
                      </DropdownToggle>
                      <DropdownMenu
                        className="shadow-sm bg-0 "
                        right
                        style={{
                          borderRadius: '5px',
                          width: '250px',
                          marginTop: '10px',
                          marginRight: '10px'
                        }}
                      >
                        <div className="dropdown-item bg-white">
                          <div
                            className="row justify-content-start ml- -50 mr-0 "
                            // style={{ height: '100px' }}
                          >
                            <div className="col-4 align-self-start">
                              <div className="card-img ">
                                <Link to="/upload-profileimage">
                                  <img
                                    className="rounded-circle text-capitalize"
                                    src={user.photo}
                                    alt={user.name}
                                    style={{ width: '50px' }}
                                    title={user.name}
                                  />{' '}
                                </Link>
                              </div>
                            </div>
                            <div className="col-8 align-self-center ">
                              <div className=" text-small text-dark text-capitalize">
                                {user.name}
                              </div>
                              <p
                                className="text-muted"
                                style={{ fontSize: '9px' }}
                              >
                                {user.email}
                              </p>
                            </div>
                            <Link
                              to="/profiles"
                              className="btn btn-light ml-auto text-dark border-1"
                            >
                              <i className="fa fa-wrench" aria-hidden="true" />{' '}
                              Profiles
                            </Link>
                          </div>
                        </div>
                        <div className="dropdown-divider" />

                        <div
                          className="dropdown-item btn text-dark bg-white"
                          onClick={this.onLogoutClick}
                        >
                          Sign Out
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Dropdown
                      isOpen={this.state.dropdown}
                      toggle={this.toggleDropdown}
                    >
                      <DropdownToggle
                        className=" btn btn-link  rounded rounded-circle p-2 "
                        style={{ border: 'none' }}
                      >
                        <i
                          className="fas fa-user-alt fa-lg fa-white text-light text-capitalize"
                          aria-hidden="true"
                          title={user.name}
                        />
                      </DropdownToggle>
                      <DropdownMenu
                        className="shadow-sm bg-white"
                        right
                        style={{
                          borderRadius: '5px',
                          width: '250px',
                          marginTop: '10px',
                          marginRight: '10px'
                        }}
                      >
                        <div className="dropdown-item bg-white ">
                          <div
                            className="row justify-content-start ml- -50 mr-0"
                            // style={{ height: '100px' }}
                          >
                            <div className="col-4 align-self-start ">
                              <div className="card-img ">
                                <Link to="/upload-profileimage">
                                  <img
                                    className="rounded-circle text-capitalize"
                                    src="/img/placeholder.jpg"
                                    // alt={user.name}
                                    style={{ width: '50px' }}
                                    title={user.name}
                                  />{' '}
                                </Link>
                              </div>
                            </div>
                            <div className="col-8 align-self-start ">
                              <div className=" text-small text-dark text-capitalize">
                                {user.name}
                              </div>
                              <p
                                className="text-muted"
                                style={{ fontSize: '9px' }}
                              >
                                {user.email}
                              </p>
                            </div>
                            <Link
                              to="/profiles"
                              className="btn btn-light ml-auto text-dark border-1"
                              onClick={this.toggleDropdown}
                            >
                              <i className="fa fa-wrench" aria-hidden="true" />{' '}
                              Profiles
                            </Link>
                          </div>
                        </div>
                        <div className="dropdown-divider" />
                        <div className="dropdown-item bg-white">
                          <Link
                            className=" text-dark"
                            to="/forgotpassword"
                            onClick={this.toggleDropdown}
                            style={{
                              textDecoration: 'none',
                              background: 'none'
                            }}
                          >
                            Reset Password
                          </Link>
                        </div>
                        <div className="dropdown-divider" />

                        <div
                          className="dropdown-item btn text-dark bg-white"
                          onClick={this.onLogoutClick}
                        >
                          Sign Out
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </div>
              </Animate>
            </li>
          </ul>
        </nav>

        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          // Default icon disabled so we can use navbar-expand-all icon for it.
          customBurgerIcon={false}
          // customCrossIcon={false}
          //ClassNames changed
          // itemListClassName={'nav-item'}
        >
          <HashLink
            onClick={this.closeMenu}
            className="menu-item  text-muted text-capitalize text-weight-light"
            to="/dashboard"
          >
            Dashboard
          </HashLink>
          <HashLink
            onClick={this.closeMenu}
            className=" menu-item  text-muted text-capitalize"
            to="/profiles"
          >
            Developers
          </HashLink>

          <a
            onClick={this.onLogoutClick}
            className="menu-item display-5 text-danger text-capitalize"
            href=""
            title={user.name}
          >
            Sign Out
          </a>
        </Menu>
      </div>
    );

    const guestLinks = (
      <div>
        <nav
          className="navbar navbar-expand-all bg-dark navbar-dark fixed-top"
          // style={{ backgroundColor: 'none', borderBottom: 'none' }}
        >
          <button
            onClick={this.toggleMenu}
            type="button"
            className="navbar-toggler"
            // data-toggle="collapse"
            // data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <HashLink
            to="/#home-page"
            className="navbar-brand ml-auto d-none d-md-block "
          >
            T3CH GeeGs
          </HashLink>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="#" onClick={this.toggle}>
                Sign In
              </Link>
            </li>
          </ul>
        </nav>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          // Default icon disabled so we can use navbar-expand-all icon for it.
          customBurgerIcon={false}
          // customCrossIcon={false}
          //ClassNames changed
          // itemListClassName={'nav-item'}
        >
          <div className="my-3">
            <Button
              outline
              color="secondary"
              className="btn-block"
              onClick={this.onCollapse}
              style={{ marginBottom: '1rem' }}
            >
              Already a Member ?
            </Button>
            <Collapse isOpen={this.state.collapse}>
              <NavItem
                // className="bm-item"
                style={{
                  textDecoration: 'none',
                  fontWeight: '400',
                  color: 'gray',
                  cursor: 'pointer',
                  listStyle: 'none',
                  fontSize: '20px'
                }}
                // it will close the burger menu and false the Collapse button & toggle the login modal .. check toggle function.
                onClick={this.toggle}
              >
                {' '}
                Sign In
              </NavItem>
              <NavItem
                style={{
                  textDecoration: 'none',
                  fontWeight: '400',
                  color: 'gray',
                  fontSize: '20px',
                  listStyle: 'none'
                }}
              >
                <Link
                  onClick={this.closeMenu}
                  to="/forgotpassword"
                  style={{
                    textDecoration: 'none',
                    color: 'gray'
                  }}
                >
                  Reset password
                </Link>
              </NavItem>
            </Collapse>
          </div>
          <HashLink
            onClick={this.closeMenu}
            className="menu-item display-4"
            to="/#explore"
          >
            Explore
          </HashLink>
          <HashLink
            onClick={this.closeMenu}
            className="menu-item display-4"
            to="/#footer"
          >
            Contact
          </HashLink>

          <a
            onClick={this.showSettings}
            className="menu-item display-4"
            href=""
          >
            Settings
          </a>
        </Menu>
      </div>
    );

    return (
      <div>
        <div>{isAuthenticated ? authLinks : guestLinks}</div>
        <ToastContainer />
        <div className="container.fluid">
          <div className="row">
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              id="contact-modal"
              className="bg-primary"
              style={{ color: 'green' }}
            >
              {/* <ModalHeader
              toggle={this.toggle}\
              style={{ backgroundColor: 'none' }}
            /> */}
              <ModalBody className="bg-dark">
                <div
                  className=" text-center card-form bg-dark"
                  style={{ borderRadius: '5px' }}
                >
                  <div
                    className="modal-header p-0"
                    style={{ borderBottom: 'none', padding: 'none' }}
                  >
                    <button
                      type="button"
                      className="close text-white"
                      onClick={this.toggle}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <h3 className="text-white display-4 mb-5">Log in</h3>
                    {success ? (
                      <div className="text-center  text-muted text-sm lead mb-2 ">
                        <i class="fas fa-check text-success" />
                        {/* <strong>{errors}</strong> */}
                        {success}
                      </div>
                    ) : (
                      ''
                    )}
                    <form className="card-form" onSubmit={this.onSubmit}>
                      <div className="form-group text-light">
                        <InputGroup
                          placeholder="Email"
                          name="email"
                          type="email"
                          icon="fa fa-at"
                          value={this.state.email}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />
                        <InputGroup
                          placeholder="Password"
                          name="password"
                          type="password"
                          icon="fa fa-key"
                          value={this.state.password}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />

                        <button
                          type="submit"
                          className="btn btn-secondary btn-block text-white lead border-light  "
                        >
                          <i className="fas fa-sign-in-alt pr-2" /> Sign in{' '}
                        </button>
                      </div>

                      {loginErrors && (
                        <small className="text-center  text-danger text-muted ">
                          <i className="fas fa-exclamation-triangle text-danger" />
                          {loginErrors}
                        </small>
                      )}

                      <div>
                        <p className="text-white lead mb-4">
                          <br />
                          login with social account
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    profile: state.profile,
    // login errors are different than normal errors, just to show it on Modals.
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile,
    clearAllProfiles,
    loginUser,
    loginSocialUser,
    getSuccessReset,
    getLoginErrorReset
  }
)(withRouter(HeaderNavbar));
