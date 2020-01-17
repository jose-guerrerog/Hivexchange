import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard'; 

function App() {
  
  const PrivateRoute = ({ component: Component, ...props }) => {
    const token = localStorage.getItem('token');
    return (
      <Route
        {...props}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };

  return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
  )
}

export default App;
