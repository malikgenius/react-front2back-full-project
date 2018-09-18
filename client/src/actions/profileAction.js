import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile')
    .then(
      res =>
        dispatch({
          type: GET_PROFILE,
          payload: res.data
        })

      // we can register with empty profile, if no profile we should return empty profile in err
    )
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => {
      // dispatch({
      //   type: GET_PROFILE,
      //   payload: res.data
      // });
      history.push('/dashboard');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clearing Profile on logout
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Delete Profile Only not the Account
export const deleteProfile = history => dispatch => {
  if (
    // window.confirm will popup an alert from browser ..
    window.confirm(
      'are you sure? your profile will be deleted but account remains active.'
    )
  ) {
    axios
      .delete('/api/profile/deleteprofile')
      .then(res => {
        dispatch({
          type: CLEAR_CURRENT_PROFILE
        });
        dispatch({
          type: GET_PROFILE,
          payload: {}
        });
        history.push('/dashboard');
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

// Delete Account which will delete Profile as well.
export const deleteAccount = () => dispatch => {
  if (window.confirm('are you sure? this can Not be reverse')) {
    axios
      .delete('/api/profile/deleteuser')
      .then(res => {
        // we need to remove token from localstorage or it will be there till expires.
        localStorage.removeItem('jwtToken');
        // setAuthToken shoudl be false.. check its function and video again ..
        setAuthToken(false);
        // current user null will wipe the redux store with null user.
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};
