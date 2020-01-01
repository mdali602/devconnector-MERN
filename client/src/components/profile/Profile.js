import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getProfileById } from '../../actions';

import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({
  match: {
    params: { id }
  },
  auth,
  profile: { profile, loading },
  getProfileById
}) => {
  useEffect(() => {
    getProfileById(id);
  }, [loading, getProfileById, id]);
  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/profiles' className='btn btn-light'>
            {' '}
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
          <div className='profile-exp bg-white p-2'>
            <h2 className='text-primary'>Experience</h2>
            {profile.experience.length > 0 ? (
              profile.experience.map(exp => {
                console.log('TCL: exp', exp);

                return <ProfileExperience key={exp._id} experience={exp} />;
              })
            ) : (
              <h4>No experience credentials</h4>
            )}
          </div>
          <div className='profile-edu bg-white p-2'>
            <h2 className='text-primary'>Education</h2>
            {profile.education.length > 0 ? (
              profile.education.map(edu => {
                console.log('TCL: edu', edu);

                return <ProfileEducation key={edu._id} education={edu} />;
              })
            ) : (
              <h4>No education credentials</h4>
            )}
          </div>

          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile
});
export default connect(mapStateToProps, { getProfileById })(Profile);
