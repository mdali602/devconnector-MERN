import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './actionTypes';

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
    /* dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response && err.response.statusText, status: err.response && err.response.status }
    }); */
  }
  // dispatch()
};
