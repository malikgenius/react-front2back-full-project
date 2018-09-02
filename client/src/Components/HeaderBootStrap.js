import React from 'react';
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from 'reactstrap';

export default class HeaderBootStrap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      modal: false
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
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
                    {/* <Link className="nav-link " to="#">
                      Log in
                    </Link> */}
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
                class=" text-center card-form bg-dark"
                style={{ borderRadius: '5px' }}
              >
                <div class="card-body">
                  <h3 class="text-white display-4 mb-5">Log in</h3>

                  <form class="card-form">
                    <div class="form-group ">
                      <input
                        type="email"
                        class="form-control form-control-lg mb-2 bg-dark"
                        placeholder="Email "
                      />
                      <input
                        type="password"
                        class="form-control form-control-lg mb-4 bg-dark"
                        placeholder="Password "
                      />

                      <button
                        type="submit"
                        class="btn btn-outline-secondary btn-block text-white border-light "
                      >
                        {' '}
                        Log in{' '}
                      </button>
                    </div>

                    <div>
                      <p class="text-white lead mb-4">
                        {/* <strong>------------Or-------------</strong> */}
                        <br />
                        use your social account to login
                      </p>

                      <Link to="/google" style={{ textDecoration: 'none' }}>
                        <button
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

/* <Navbar color="light" light expand="md" className="fixed-top">
          <NavbarBrand href="/">
            <img
              src="/zeenahlogo.svg"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="ZEENAH.LLC"
            />{' '}
            reactstrap
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar> */

// import React, { Component } from 'react';
// export default class HeaderBootStrap extends Component {
//   render() {
//     return (
//       <div>
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <a className="navbar-brand" href="#">
//             <img
//               src="/zeenahlogo.svg"
//               width="40"
//               height="40"
//               className="d-inline-block align-top"
//               alt="ZEENAH.LLC"
//             />
//           </a>

//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>

//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav mr-auto">
//               <li className="nav-item active">
//                 <a className="nav-link" href="#">
//                   Home <span className="sr-only">(current)</span>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">
//                   Link
//                 </a>
//               </li>
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   id="navbarDropdown"
//                   role="button"
//                   data-toggle="dropdown"
//                   aria-haspopup="true"
//                   aria-expanded="false"
//                 >
//                   Dropdown
//                 </a>
//                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                   <a className="dropdown-item" href="#">
//                     Action
//                   </a>
//                   <a className="dropdown-item" href="#">
//                     Another action
//                   </a>
//                   <div className="dropdown-divider" />
//                   <a className="dropdown-item" href="#">
//                     Something else here
//                   </a>
//                 </div>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link disabled" href="#">
//                   Disabled
//                 </a>
//               </li>
//             </ul>
//             <form className="form-inline my-2 my-lg-0">
//               <input
//                 className="form-control mr-sm-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//               <button
//                 className="btn btn-outline-success my-2 my-sm-0"
//                 type="submit"
//               >
//                 Search
//               </button>
//             </form>
//           </div>
//         </nav>
//       </div>
//     );
//   }
// }
