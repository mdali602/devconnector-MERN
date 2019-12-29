import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert, register } from '../../actions';

export const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const handleChange = event =>
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });

  const handleSubmit = event => {
    event.preventDefault();
    if (password !== password2) {
      console.log('Password did not match');
      setAlert('Password did not match', 'danger', 3000);
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <h1 className='large text-primary'>Sign Up {name} </h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account {email}
      </p>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={handleChange}
            // required
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            // minLength='6'
            // required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={handleChange}
            // minLength='6'
            // required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
/* const mapDispatchToProps = dispatch => ({
  setAlert: (msg, alertType) => dispatch(setAlert(msg, alertType))
});
export default connect(null, mapDispatchToProps)(Register); */
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
