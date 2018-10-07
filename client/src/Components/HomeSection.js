import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUpBootStrap4Col from './SignUpBootStrap4Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomeSection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };
  // below will check if props changes, when logged out it will trigger and redirect
  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  // home-page has 12 Row and 12 cols, 8 are defined here but 4 for Sign Up form are in seperate file now.
  // d-none will not display below 8 col in small screens.
  // className="row mr- -10 ml- -10"  by default its -15 we can even go for mr-0 and ml-0 check yourself.
  render() {
    return (
      <div>
        <div className="home-section" id="home-page">
          <div className="dark-overlay">
            <div className="home-inner">
              <div className="container">
                <div className="row mr- -10 ml- -10">
                  <div className="col-lg-8 d-none d-lg-block">
                    <h1 className="display-4">
                      Build <strong>social profile</strong> to join{' '}
                      <strong> IT-Professionals in Oman</strong>
                    </h1>
                    <div className="d-flex flex-row">
                      <div className="p-4 align-self-start">
                        <i className="fa fa-check-square-o" />
                      </div>
                      <div className="p-4 align-self-end">
                        Id eiusmod laborum sint sint irure consectetur ipsum ex
                        aute commodo do.Aliquip deserunt quis aute nostrud
                        proident ipsum laborum ex velit
                      </div>
                    </div>

                    <div className="d-flex flex-row">
                      <div className="p-4 align-self-start">
                        <i className="fa fa-check-square-o" />
                      </div>
                      <div className="p-4 align-self-end">
                        Quis ullamco ad nulla sint sint ex dolore Lorem qui ea.
                        Elit excepteur officia consequat excepteur cupidatat
                        labore ipsum. Elit sint exercitation veniam pariatur
                        tempor et pariatur. Aliquip deserunt quis aute nostrud
                        proident ipsum laborum ex velit. Pariatur et laboris
                        adipisicing adipisicing aute dolor eiusmod eiusmod culpa
                        tempor eu.
                      </div>
                    </div>

                    <div className="d-flex flex-row">
                      <div className="p-4 align-self-start">
                        <i className="fa fa-check-square-o" />
                      </div>
                      <div className="p-4 align-self-end">
                        Velit nisi veniam eu mollit ea officia duis
                        cillum.Aliquip deserunt quis aute nostrud proident ipsum
                        laborum ex velit
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <SignUpBootStrap4Col />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="explore-head-section " id="explore">
          {/* <div className="dark-overlay"> */}
          <div className="container">
            <div className="row mr- -10 ml- -10">
              <div className="col text-center">
                <div className="py-5">
                  <h1 className="display-4 text-light">Explore</h1>
                  <p className="lead text-muted">
                    Pariatur adipisicing est et ut tempor do pariatur laborum
                    tempor qui cupidatat. Officia officia eiusmod excepteur
                    nulla ea laborum nisi incididunt proident aute sunt. Do elit
                    culpa velit aliquip sunt ipsum ipsum. Eiusmod ad pariatur
                    laboris ut non eu. Commodo ipsum adipisicing cupidatat
                    laboris occaecat est commodo ad consectetur.
                  </p>
                  <a href="#" className="btn btn-outline-secondary">
                    Find Out More
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>

        <section className="explore-section bg-light text-muted pt-5 pb-2">
          <div className="container">
            <div className="row mr-0 ml-0">
              <div className="row ">
                <div className="col-md-6 align-self-center ">
                  <img
                    src="img/explore-section1.jpg"
                    className="img-fluid rounded-circle"
                    alt="Round Image"
                  />
                </div>
                <div className="col-md-6">
                  <h3>Explore & Connect</h3>
                  <p>
                    Mollit aute veniam mollit do voluptate consequat ipsum
                    pariatur. Fugiat eu ex incididunt nisi nostrud tempor duis
                    aute dolor mollit ea fugiat id consectetur. Veniam
                    adipisicing aute ut ipsum laborum pariatur pariatur.
                  </p>
                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start">
                      <i className="fa fa-check-square-o" />
                    </div>
                    <div className="p-4 align-self-end">
                      <p>
                        Lorem nisi amet incididunt id qui sit. Aliqua consequat
                        id Lorem tempor aliquip velit ut non id. Ut laboris
                        pariatur incididunt consectetur officia occaecat mollit
                        sint eiusmod magna. Excepteur in est pariatur
                        adipisicing enim Lorem aliquip eiusmod adipisicing enim.
                        Minim sit dolor consequat aliqua irure ad. Deserunt
                        pariatur nisi enim pariatur sunt nostrud dolore ipsum
                        cupidatat.
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-row">
                    <div className="p-4 align-self-start">
                      <i className="fa fa-check-square-o" />
                    </div>
                    <div className="p-4 align-self-end">
                      <p>
                        {' '}
                        Hello its my first Bootstrap & React Site, what about
                        you Jaani Hello its my first Bootstrap & React Site,
                        what about you Jaani
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    // login errors are different than normal errors, just to show it on Modals.
    errors: state.errors
  };
};

export default connect(mapStateToProps)(withRouter(HomeSection));
