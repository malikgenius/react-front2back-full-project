import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  CLEAR_ALL_PROFILES,
  GET_PAGINATION_PAGES,
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

// Get Profile by Handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
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

// Get All Profiles

export const getProfiles = page => dispatch => {
  console.log(page);
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/all`, {
      params: { page }
    })
    .then(res => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILES,
        payload: res.data.docs
      });
      // GET pagination will get all the extra pagination options to redux store
      // total records, page number, records per page .. etc from server.
      // this will go to Component local state via nextProps to <Pagination /> comp.
      dispatch({
        type: GET_PAGINATION_PAGES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// Get Pagination Pages from Backend & Total Records.
export const getPagination = () => dispatch => {};

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

// Add Experience to Profile
export const addExperience = (expData, history) => dispatch => {
  // return console.log(expData);
  axios
    .post('/api/profile/experience', expData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// Delete Experience
export const deleteExperience = id => dispatch => {
  if (
    // window.confirm will popup an alert from browser ..
    window.confirm('are you sure? you want to delete this Experience.')
  ) {
    axios
      .delete(`/api/profile/experience/${id}`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
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

// Add Experience to Profile
export const addEducation = (eduData, history) => dispatch => {
  // return console.log(expData);
  axios
    .post('/api/profile/education', eduData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete Experience
export const deleteEducation = id => dispatch => {
  if (
    // window.confirm will popup an alert from browser ..
    window.confirm('are you sure? you want to delete Qualification.')
  ) {
    axios
      .delete(`/api/profile/education/${id}`)
      .then(res => {
        dispatch({
          type: GET_PROFILE,
          payload: res.data
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

export const clearAllProfiles = () => {
  return {
    type: CLEAR_ALL_PROFILES
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
