import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { HashLink as Link } from 'react-router-hash-link';

class SignInModal extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    console.log(this.props);
    const { showModal, onModalClose } = this.props;
    return (
      <div>
        <div>
          <Modal
            isOpen={showModal}
            toggle={this.toggle}
            // id="contact-modal"
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

                  <form className="card-form">
                    <div className="form-group ">
                      <input
                        type="email"
                        className="form-control form-control-lg mb-2 bg-dark"
                        placeholder="Email "
                      />
                      <input
                        type="password"
                        className="form-control form-control-lg mb-4 bg-dark"
                        placeholder="Password "
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
                    <button
                      className="btn btn-primary btn-block"
                      onClick={onModalClose}
                    >
                      Cancel
                    </button>
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

export default SignInModal;
