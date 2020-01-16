import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from './components/Login';
import Dashboard from './components/Dashboard'; 

function App(props) {
  return (
      <div>
        <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </Router>
      </div>
  )
}

export default App;
