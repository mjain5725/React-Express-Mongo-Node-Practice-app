import axios from 'axios';
import * as actions from './index';
import * as actionType from './types';

//REGISTER USER
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //PREPARING DATA TO SEND
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: actionType.REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionType.REGISTER_FAIL,
    });
  }
};
