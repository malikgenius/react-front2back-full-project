import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE
} from './types';

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
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
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
