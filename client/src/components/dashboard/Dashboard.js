import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import { deleteAccount, getCurrentProfile } from '../../store/actions/index';

const Dashboard = ({
  auth: { user, loading: userloading },
  profile: { profile, loading },
  deleteAccount,
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>{' '}
        {user && !userloading ? 'Welcome ' + user.name : null}
      </p>
      {profile !== null && !loading ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>Profile is not set up, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
