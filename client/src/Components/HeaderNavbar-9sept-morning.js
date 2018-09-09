import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem
} from 'reactstrap';

import {
  logoutUser,
  loginUser,
  loginSocialUser,
  getSuccessReset
} from '../actions/authAction';

class HeaderNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: '',
      success: '',
      modal: false,
      menuOpen: false,
      collapse: false
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
      this.setState({ errors: nextProps.errors.loginError });
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
    this.props.getSuccessReset();
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
      errors: '',
      success: undefined
    });
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
    this.toggle();
  };

  showSettings = event => {
    event.preventDefault();
    console.log('clicked');
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
    const { errors, success } = this.state;
    const { isAuthenticated, user } = this.props.auth;
    // Check if authenticated or not.
    const authLinks = (
      <div className="my-3">
        {user.photo ? (
          <NavItem
            onClick={this.onCollapse}
            style={{
              textDecoration: 'none',
              fontWeight: '600',
              color: 'gray',
              cursor: 'pointer',
              listStyle: 'none',
              fontSize: '25px'
            }}
          >
            <img
              className="rounded-circle"
              src={user.photo}
              alt={user.name}
              style={{ width: '35px' }}
              title={user.name}
            />{' '}
            {user.name}
          </NavItem>
        ) : (
          <NavItem
            onClick={this.onCollapse}
            className="text-center"
            style={{
              textDecoration: 'none',
              fontWeight: '600',
              color: 'gray',
              cursor: 'pointer',
              listStyle: 'none',
              fontSize: '25px'
            }}
          >
            <img
              className="rounded-circle"
              src="/img/placeholder.jpg"
              alt={user.name}
              style={{ width: '35px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            {user.name}
          </NavItem>
        )}
        {user.method === 'local' ? (
          <Collapse isOpen={this.state.collapse}>
            <Link
              onClick={this.closeMenu}
              // className="bm-item h1 mr-2"
              style={{
                textDecoration: 'none',
                fontWeight: '400',
                color: 'gray',
                cursor: 'pointer',
                listStyle: 'none',
                fontSize: '20px'
              }}
              to="/forgotpassword"
            >
              Change Password{' '}
            </Link>
            <NavItem
              to="/"
              onClick={this.onLogoutClick.bind(this)}
              // className="bm-item mr-2"
              style={{
                textDecoration: 'none',
                fontWeight: '400',
                color: 'gray',
                cursor: 'pointer',
                listStyle: 'none',
                fontSize: '20px'
              }}
            >
              Sign Out
            </NavItem>
          </Collapse>
        ) : (
          <Collapse isOpen={this.state.collapse}>
            <NavItem
              to="/"
              onClick={this.onLogoutClick.bind(this)}
              // className="bm-item  ml-5 "
              style={{
                textDecoration: 'none',
                fontWeight: '400',
                color: 'gray',
                cursor: 'pointer',
                listStyle: 'none',
                fontSize: '20px'
              }}
            >
              Sign Out
            </NavItem>
          </Collapse>
        )}
      </div>
    );

    const guestLinks = (
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
    );

    return (
      <div>
        <div>
          <Menu
            isOpen={this.state.menuOpen}
            onStateChange={state => this.handleStateChange(state)}
            // Default icon disabled so we can use navbar-expand-all icon for it.
            customBurgerIcon={false}
            // customCrossIcon={false}
            //ClassNames changed
            // itemListClassName={'nav-item'}
          >
            {isAuthenticated ? authLinks : guestLinks}
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

          <div className="container">
            <HashLink
              to="/#home-page"
              className="navbar-brand ml-auto float-right text-center "
            >
              T3CH GeeGs
            </HashLink>
            <div className="collapse navbar-collapse " id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/#explore">
                    Explore
                  </Link>
                </li>
                <li className="nav-item">
                  <HashLink className="nav-link" to="/#footer">
                    Contact
                  </HashLink>
                </li>
                <li className="nav-item">
                  {isAuthenticated ? authLinks : guestLinks}
                </li>
                {isAuthenticated ? (
                  <li
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={this.onLogoutClick}
                  >
                    {' '}
                    Log Out
                  </li>
                ) : (
                  ''
                )}
              </ul>
            </div>
          </div>
        </nav>

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
              toggle={this.toggle}
              style={{ backgroundColor: 'none' }}
            /> */}
              <ModalBody className="bg-dark">
                <div
                  className=" text-center card-form bg-dark"
                  style={{ borderRadius: '5px' }}
                >
                  <div
                    class="modal-header p-0"
                    style={{ borderBottom: 'none', padding: 'none' }}
                  >
                    <button
                      type="button"
                      class="close text-white"
                      onClick={this.toggle}
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <h3 className="text-white display-4 mb-5">Log in</h3>
                    {success ? (
                      <div className="text-center  text-success text-sm lead mb-2 ">
                        {/* <strong>{errors}</strong> */}
                        {success}
                      </div>
                    ) : (
                      ''
                    )}
                    <form className="card-form" onSubmit={this.onSubmit}>
                      <div className="form-group text-light">
                        <input
                          name="email"
                          type="email"
                          className="form-control form-control-lg mb-2 bg-dark text-light"
                          placeholder="Email "
                          value={this.state.email}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />
                        <input
                          name="password"
                          type="password"
                          className="form-control form-control-lg mb-4 bg-dark text-light"
                          placeholder="Password "
                          value={this.state.password}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />

                        <button
                          type="submit"
                          className="btn btn-outline-secondary btn-block text-white border-light "
                        >
                          {' '}
                          Log in{' '}
                        </button>
                      </div>
                      {errors ? (
                        <div className="text-center  text-danger text-sm">
                          {/* <strong>{errors}</strong> */}
                          {errors}
                        </div>
                      ) : (
                        ''
                      )}
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
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    // login errors are different than normal errors, just to show it on Modals.
    errors: state.errors,
    success: state.success
  };
};

export default connect(
  mapStateToProps,
  { logoutUser, loginUser, loginSocialUser, getSuccessReset }
)(withRouter(HeaderNavbar));
