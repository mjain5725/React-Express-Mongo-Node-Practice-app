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

//GET ALL PROFILE
export const getProfiles = () => async dispatch => {
  dispatch({ type: actionType.CLEAR_PROFILE });

  try {
    const res = await axios.get('api/profile');

    dispatch({
      type: actionType.GET_ALLPROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET PROFILE BY ID
export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`api/profile/user/${userId}`);

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

//GET GITHUB REPOS
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get(`api/profile/github/${username}`);

    dispatch({
      type: actionType.GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//CREATE OR UPDATE A PROFILE
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: actionType.GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      actions.setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD EXPERIENCE
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/experience', formData, config);

    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(actions.setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//ADD EDUCATION
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/education', formData, config);

    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(actions.setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE EXPERIENCE
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(actions.setAlert('Experience Removed', 'danger'));
  } catch (err) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE EDUCATION
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: actionType.UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(actions.setAlert('Education Removed', 'danger'));
  } catch (err) {
    dispatch({
      type: actionType.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//DELETE ACCOUNT
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Do you want to delete your account! Are you sure?')) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch({
        type: actionType.CLEAR_PROFILE,
      });
      dispatch({
        type: actionType.ACCOUNT_DELETED,
      });

      dispatch(actions.setAlert('Account has been deleted'));
    } catch (err) {
      dispatch({
        type: actionType.PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
