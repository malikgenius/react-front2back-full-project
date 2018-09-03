import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterModal from './Footer-Modal';
import SignUpBootStrap4Col from './SignUpBootStrap4Col';

export default class HomeSection extends Component {
  constructor() {
    super();
  }

  // home-page has 12 Row and 12 cols, 8 are defined here but 4 for Sign Up form are in seperate file now.
  render() {
    return (
      <div class="home-page" id="home-page">
        <div class="dark-overlay">
          <div class="home-inner">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 d-none d-lg-block">
                  <h1 class="display-4">
                    Build <strong>social profile</strong> to join{' '}
                    <strong> IT-Professionals in Oman</strong>
                  </h1>
                  <div class="d-flex flex-row">
                    <div class="p-4 align-self-start">
                      <i class="fa fa-check-square-o" />
                    </div>
                    <div class="p-4 align-self-end">
                      Id eiusmod laborum sint sint irure consectetur ipsum ex
                      aute commodo do.Aliquip deserunt quis aute nostrud
                      proident ipsum laborum ex velit
                    </div>
                  </div>

                  <div class="d-flex flex-row">
                    <div class="p-4 align-self-start">
                      <i class="fa fa-check-square-o" />
                    </div>
                    <div class="p-4 align-self-end">
                      Quis ullamco ad nulla sint sint ex dolore Lorem qui ea.
                      Elit excepteur officia consequat excepteur cupidatat
                      labore ipsum. Elit sint exercitation veniam pariatur
                      tempor et pariatur. Aliquip deserunt quis aute nostrud
                      proident ipsum laborum ex velit. Pariatur et laboris
                      adipisicing adipisicing aute dolor eiusmod eiusmod culpa
                      tempor eu.
                    </div>
                  </div>

                  <div class="d-flex flex-row">
                    <div class="p-4 align-self-start">
                      <i class="fa fa-check-square-o" />
                    </div>
                    <div class="p-4 align-self-end">
                      Velit nisi veniam eu mollit ea officia duis cillum.Aliquip
                      deserunt quis aute nostrud proident ipsum laborum ex velit
                    </div>
                  </div>
                </div>

                <div class="col-lg-4">
                  <SignUpBootStrap4Col />
                </div>
              </div>

              <section class="explore-head-section " id="explore">
                <div class="container" style={{ paddingTop: '50px' }}>
                  <div class="row">
                    <div class="col text-center">
                      <div class="py-5">
                        <h1 class="display-4">Explore</h1>
                        <p class="lead text-muted">
                          Pariatur adipisicing est et ut tempor do pariatur
                          laborum tempor qui cupidatat. Officia officia eiusmod
                          excepteur nulla ea laborum nisi incididunt proident
                          aute sunt. Do elit culpa velit aliquip sunt ipsum
                          ipsum. Eiusmod ad pariatur laboris ut non eu. Commodo
                          ipsum adipisicing cupidatat laboris occaecat est
                          commodo ad consectetur.
                        </p>
                        <a href="#" class="btn btn-outline-secondary">
                          Find Out More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="explore-section bg-light text-muted pt-5 pb-2">
                <div class="container">
                  <div class="row">
                    <div class="row">
                      <div class="col-md-6 align-self-center ">
                        <img
                          src="img/explore-section1.jpg"
                          class="img-fluid rounded-circle"
                          alt="Round Image"
                        />
                      </div>
                      <div class="col-md-6">
                        <h3>Explore & Connect</h3>
                        <p>
                          Mollit aute veniam mollit do voluptate consequat ipsum
                          pariatur. Fugiat eu ex incididunt nisi nostrud tempor
                          duis aute dolor mollit ea fugiat id consectetur.
                          Veniam adipisicing aute ut ipsum laborum pariatur
                          pariatur.
                        </p>
                        <div class="d-flex flex-row">
                          <div class="p-4 align-self-start">
                            <i class="fa fa-check-square-o" />
                          </div>
                          <div class="p-4 align-self-end">
                            <p>
                              Lorem nisi amet incididunt id qui sit. Aliqua
                              consequat id Lorem tempor aliquip velit ut non id.
                              Ut laboris pariatur incididunt consectetur officia
                              occaecat mollit sint eiusmod magna. Excepteur in
                              est pariatur adipisicing enim Lorem aliquip
                              eiusmod adipisicing enim. Minim sit dolor
                              consequat aliqua irure ad. Deserunt pariatur nisi
                              enim pariatur sunt nostrud dolore ipsum cupidatat.
                            </p>
                          </div>
                        </div>

                        <div class="d-flex flex-row">
                          <div class="p-4 align-self-start">
                            <i class="fa fa-check-square-o" />
                          </div>
                          <div class="p-4 align-self-end">
                            <p>
                              {' '}
                              Hello its my first Bootstrap & React Site, what
                              about you Jaani Hello its my first Bootstrap &
                              React Site, what about you Jaani
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <FooterModal id="footer" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
