import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import app from './views/app';
import main from './views';
import Login from './views/Login';

function App() {
  
  const PrivateRoute = ({ component: Component, ...props }) => {
    const token = localStorage.getItem('token');
    console.log('props');
    console.log(props);
    return (
      <Route
        {...props}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  };

  return (
      <div>
        <Router>
          <Switch>
            <PrivateRoute path="/app" component={app} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={main} />
          </Switch>
        </Router>
      </div>
  )
}

export default App;
