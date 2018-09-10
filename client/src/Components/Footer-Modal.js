import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { contactEmail } from '../actions/contactAction';

class FooterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      email: '',
      message: '',
      errors: '',
      success: undefined
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  // onFocus clear all the errors, while user is typing in email or password, we dont need to show them old error.
  onFocus = () => {
    this.setState({
      errors: '',
      success: undefined
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onformSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };
    this.props.contactEmail(userData, this.props.history);
  };

  render() {
    return (
      <footer>
        <div>
          <div id="footer" class="bg-dark text-muted ">
            <div class="container">
              <div class="row mr-0 ml-0">
                <div class="col text-center">
                  <div class="py-2">
                    <h1 class="h5">T3CH GeeGs L.L.C</h1>
                    <p>Copyright &copy; {new Date().getFullYear()}</p>
                    <button
                      class="btn btn-outline-primary"
                      onClick={this.toggle}
                      //   data-toggle="modal"
                      //   data-target="#contactModal"
                    >
                      Contact Us{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
                  <div
                    class="modal-header p-0"
                    style={{ borderBottom: 'none' }}
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
                  <div class="card-body">
                    <h3 class="text-white display-4 mb-5">Speak Up</h3>

                    <form onSubmit={this.onformSubmit} class="card-form">
                      <div class="form-group text-light">
                        <input
                          name="name"
                          type="text"
                          className="form-control form-control-lg mb-2 bg-dark text-light"
                          placeholder="Name "
                          value={this.state.name}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />
                        <input
                          name="email"
                          type="email"
                          className="form-control form-control-lg mb-2 bg-dark text-light"
                          placeholder="Email "
                          value={this.state.email}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                        />
                        <textarea
                          name="message"
                          className="form-control form-control-lg mb-2 bg-dark text-light"
                          placeholder="your message here "
                          value={this.state.message}
                          onChange={this.onChange}
                          onFocus={this.onFocus}
                          rows="5"
                        />
                        <button
                          type="submit"
                          //   onClick={}
                          class="btn btn-outline-secondary btn-block text-white"
                        >
                          {' '}
                          Send{' '}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </footer>
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
  { contactEmail }
)(withRouter(FooterModal));
