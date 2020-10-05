import axios from 'axios';
import * as actions from './index';
import * as actionType from './types';
import setAuthToken from '../../utils/setAuthToken';

//LOAD USER
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: actionType.USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionType.AUTH_ERROR,
    });
  }
};

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

    dispatch(actions.loadUser());
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

//LOGIN USER
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  //PREPARING DATA TO SEND
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: actionType.LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(actions.loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionType.LOGIN_FAIL,
    });
  }
};

//LOGOUT / CLEAR PROFILE
export const logout = () => dispatch => {
  dispatch({ type: actionType.LOGOUT });
};
