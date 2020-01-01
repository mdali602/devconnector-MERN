import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS
} from './actionTypes';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    const errors =
      err && err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status
      }
    });
  }
};

export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('http://localhost:5000/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    const errors =
      err && err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status
      }
    });
  }
};

// Get Profile by ID
export const getProfileById = (userId) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    const errors =
      err && err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status
      }
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.message);
    const errors =
      err && err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response && err.response.statusText,
        status: err.response && err.response.status
      }
    });
  }
};

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Cotent-Type': 'application/json'
      }
    };

    // const body = JSON.stringify(formData);

    const res = await axios.post(
      'http://localhost:5000/api/profile',
      formData,
      config
    );

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    console.error(err.message);

    const errors =
      err && err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
  // dispatch()
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Cotent-Type': 'application/json'
      }
    };

    // const body = JSON.stringify(formData);

    const res = await axios.put(
      'http://localhost:5000/api/profile/experience',
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    console.error(err.message);

    const errors =
      err && err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Cotent-Type': 'application/json'
      }
    };

    // const body = JSON.stringify(formData);

    const res = await axios.put(
      'http://localhost:5000/api/profile/education',
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (err) {
    console.error(err.message);

    const errors =
      err && err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/experience/${id}`
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Experience Removed', 'success'));
  } catch (err) {
    console.error(err.message);

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });
  }
};

// Delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/education/${id}`
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Education Removed', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err && err.response && err.response.statusText,
        status: err && err.response && err.response.status
      }
    });

  }
};

// Delete Account & profile
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This cannot be undone!')) {
    try {
      await axios.delete(`http://localhost:5000/api/profile`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
    } catch (err) {
      console.error(err.message);
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err && err.response && err.response.statusText,
          status: err && err.response && err.response.status
        }
      });

      dispatch(setAlert('Your account has been permanently deleted'));
    }
  }
};
