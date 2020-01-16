import React, {Component, Fragment} from 'react';
import NavBar from './NavBar';
import Characteristics from './Characteristics';
import {
  Table,
} from '@material-ui/core';

function Dashboard(props) {
  return (
    <Fragment>
      <NavBar />
      <Characteristics />
    </Fragment> 
  ) 
}

export default Dashboard;
