import React, { Component } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";

import AppLayout from '../../layout/AppLayout';
import Dashboard from "../../views/Dashboard";
import Invoices from "../../views/Invoices";
import Bills from "../../views/Bills";

function App(props) {
  const { match } = props;
  return (
    <AppLayout history={props.history}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
        <Route path={`${match.url}/dashboard`} component={Dashboard} />
        <Route path={`${match.url}/invoices`} component={Invoices} />
        <Route path={`${match.url}/bills`} component={Bills} />
      </Switch>
    </AppLayout>
  );
}

export default withRouter(App);
