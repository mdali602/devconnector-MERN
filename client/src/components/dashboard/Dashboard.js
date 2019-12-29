import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentProfile } from '../../actions';

import Spinner from '../layout/Spinner';
import { DashboardActions } from './DashboardActions';

export const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className='large text-primary'> Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>

      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not set yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </>
  );
  // <div></div>;
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth, profile }) => ({
  auth,
  profile
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
