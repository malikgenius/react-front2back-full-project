import React, { Component } from 'react';
import _ from 'lodash';

class ProfileHeader extends Component {
  // componentWillReceiveProps = nextProps => {
  //   if (nextProps.profile.profile === null) {
  //     this.props.history.push('/notfound');
  //   }
  // };
  render() {
    const { profile } = this.props;
    let userImage;
    if (profile.user.local) {
      if (!profile.user.local.photo) {
        userImage = (
          <img
            src="/img/placeholder.jpg"
            alt=""
            className="rounded-circle"
            style={{ width: '100px' }}
          />
        );
      } else {
        userImage = (
          <img
            src={profile.user.local.photo}
            alt=""
            className="rounded-circle"
            style={{ width: '100px' }}
          />
        );
      }
    } else if (profile.user.google) {
      userImage = (
        <img
          src={profile.user.google.photo}
          alt=""
          className="rounded-circle"
          style={{ width: '100px' }}
        />
      );
    } else if (profile.user.facebook) {
      userImage = (
        <img
          src={profile.user.facebook.photo}
          alt=""
          className="rounded-circle"
          style={{ width: '100px' }}
        />
      );
    }
    return (
      <div className="row">
        <div className="col-12 ">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-12 m-auto  text-center ">{userImage}</div>
            </div>

            <div className="text-center text-capitalize">
              {profile.user.local && (
                <h1 className="display-4 text-center">
                  {profile.user.local.name}
                </h1>
              )}
              {profile.user.google && (
                <h1 className="display-4 text-center">
                  {profile.user.google.name}
                </h1>
              )}
              {profile.user.facebook && (
                <h1 className="display-4 text-center">
                  {profile.user.facebook.name}
                </h1>
              )}
              <p className="lead text-center">
                {profile.status}{' '}
                {_.isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              {_.isEmpty(profile.location) ? null : <p>{profile.location}</p>}

              <p>
                {_.isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {_.isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                )}

                {_.isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {_.isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {_.isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                )}

                {_.isEmpty(
                  profile.social && profile.social.instagram
                ) ? null : (
                  <a
                    className="text-white p-2"
                    href={profile.social.instagram}
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
