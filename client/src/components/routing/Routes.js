import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Register from '../auth/Register';
import CreateProfile from '../profile-forms/CreateProfile';
import Dashboard from '../dashboard/Dashboard';
import EditProfile from '../profile-forms/EditProfile';
import PrivateRoute from '../routing/PrivateRoute';
import AddExperience from '../profile-forms/AddExperience';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import AddEducation from '../profile-forms/AddEducation';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';

const Routes = () => {
    return (
        <section className='container'>
        <Alert />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute
            exact
            path='/create-profile'
            component={CreateProfile}
          />
          <PrivateRoute
            exact
            path='/edit-profile'
            component={EditProfile}
          />
          <PrivateRoute
            exact
            path='/add-experience'
            component={AddExperience}
          />
          <PrivateRoute
            exact
            path='/add-education'
            component={AddEducation}
          />
          <PrivateRoute
            exact
            path='/posts'
            component={Posts}
          />
          <PrivateRoute
            exact
            path='/posts/:id'
            component={Post}
          />
          <Route component={NotFound}/>
        </Switch>
        <Alert />
      </section>
    )
}

export default Routes
