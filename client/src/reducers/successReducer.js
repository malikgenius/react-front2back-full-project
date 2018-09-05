import {
  GET_SUCCESS,
  EMAIL_VERIFIED_PASSWORD_RESET,
  GET_SUCCESS_RESET
} from '../actions/types';

const initialState = { modal: false, success: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SUCCESS:
      return {
        ...state,
        success: action.payload
        // modal: true
      };
    case EMAIL_VERIFIED_PASSWORD_RESET:
      return {
        ...state,
        modal: true
      };
    case GET_SUCCESS_RESET:
      return {
        ...state,
        success: '',
        modal: false
      };
    default: {
      return state;
    }
  }
};
