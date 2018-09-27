import React, { Component } from 'react';
import _ from 'lodash';
class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;
    //Get first Name from profile
    let firstName;
    if (profile.user.local) {
      firstName = profile.user.local.name.trim().split(' ')[0];
    } else if (profile.user.google) {
      firstName = profile.user.google.name.trim().split(' ')[0];
    } else if (profile.user.facebook) {
      firstName = profile.user.facebook.name.trim().split(' ')[0];
    }
    // Skill .map
    const skills = profile.skills.map((skill, index) => (
      <div className="p-3" key={index}>
        <i className="fa fa-check" /> {skill}
      </div>
    ));
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">
              {firstName}
              `s Bio
            </h3>
            <p className="lead text-muted text-center">
              {_.isEmpty(profile.bio) ? (
                <span>Bio is not yet set</span>
              ) : (
                profile.bio
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-sm-flex flex-wrap justify-content-around align-content-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
