import * as actionType from './types';
import axios from 'axios';
import * as actions from './index';

//GET CURRENT USERS PROFILE
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/profile/me');

    dispatch({
      type: actionType.GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
