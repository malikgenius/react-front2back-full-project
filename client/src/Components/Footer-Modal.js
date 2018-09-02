import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class FooterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      <footer>
        <div>
          <div id="footer" class="bg-dark text-muted">
            <div class="container">
              <div class="row">
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
                  <div class="card-body">
                    <h3 class="text-white display-4 mb-5">Speak Up</h3>

                    <form class="card-form">
                      <div class="form-group ">
                        <input
                          type="text"
                          class="form-control form-control-lg mb-2 bg-dark"
                          placeholder="Name "
                        />
                        <input
                          type="email"
                          class="form-control form-control-lg mb-2 bg-dark"
                          placeholder="Email "
                        />
                        <textarea
                          class="form-control form-control-lg mb-4 bg-light "
                          rows="5"
                        />
                        <button
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

          {/* <div class="modal fade" id="contactModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Contact Us</h5>
                  <buton class="close" data-dismiss="modal">
                    <span> &times; </span>
                  </buton>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label for="name"> Name</label>
                      <input class="form-control" type="text" />
                    </div>
                    <div class="form-group">
                      <label for="email"> Email </label>
                      <input class="form-control" type="text" />
                    </div>
                    <div class="form-group">
                      <label for="name"> Message</label>
                      <textarea class="form-control"> </textarea>
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-primary btn-block"> Submit </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </footer>
    );
  }
}

export default FooterModal;
