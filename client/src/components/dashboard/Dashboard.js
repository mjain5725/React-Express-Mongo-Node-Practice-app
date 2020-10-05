import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as actionType from '../../store/actions/types';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

// ({
//   getCurrentProfile,
//   auth,
//   profile: { profile, loading },
// })
const Dashboard = props => {
  useEffect(() => {
    props.getCurrentProfile();
  }, []);

  return props.profile.loading && props.profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>{' '}
        {props.auth.user && !props.auth.loading
          ? 'Welcome ' + props.auth.user.name
          : null}
      </p>
      {props.profile.profile !== null && !props.profile.loading ? (
        <Fragment>Have Profile</Fragment>
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => {
  return {
    getCurrentProfile: () => dispatch(actions.getCurrentProfile()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
