import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { logoutUser } from '../actions/authAction';

class HeaderNavbarTest extends React.Component {
  render() {
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
                    <div
                      onClick={this.toggle}
                      class="nav-link"
                      style={{ cursor: 'pointer' }}
                    >
                      Log in
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
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

export default HeaderNavbarTest;
