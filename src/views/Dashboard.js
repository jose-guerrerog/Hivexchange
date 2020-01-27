import React, {Component, Fragment} from 'react';
import NavBar from '../components/NavBar';
import Characteristics from '../components/Characteristics';
import {
  Table,
} from '@material-ui/core';

function Dashboard(props) {
  return (
    <Fragment>
      <Characteristics />
    </Fragment> 
  ) 
}

export default Dashboard;
