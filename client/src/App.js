import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
//REDUX
import { Provider } from 'react-redux';
import store from './store';
import * as actions from './store/actions/index';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(actions.loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes}/>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
