import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    // console.log(this.props);
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2-fixed mr-2">
            {profile.user.local && (
              <img
                src="/img/placeholder.jpg"
                alt=""
                className="rounded-circle"
                style={{ width: '100px' }}
              />
            )}
            {/* Google user Picture  */}
            {profile.user.google && (
              <img
                src={profile.user.google.photo}
                alt=""
                className="rounded-circle"
                style={{ width: '100px' }}
              />
            )}
            {/* facebook user picture  */}
            {profile.user.facebook && (
              <img
                src={profile.user.facebook.photo}
                alt=""
                className="rounded-circle "
                style={{ width: '100px' }}
              />
            )}
          </div>
          <div className="col-lg-6 col-md-4 col-8 text-capitalize center-block">
            {profile.user.local && (
              <h3 className="font-weight-light">{profile.user.local.name}</h3>
            )}
            {profile.user.google && (
              <h3 className="font-weight-light">{profile.user.google.name}</h3>
            )}
            {profile.user.facebook && (
              <h3 className="font-weight-light">
                {profile.user.facebook.name}
              </h3>
            )}
            <p>
              {profile.status}{' '}
              {_.isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {_.isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}
            </p>

            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li className="list-group-item" key={index}>
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
