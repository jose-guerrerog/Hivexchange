import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const fieldsRegister = [
  'New Registrations',
  'Successful Registrations',
  'New seller registrations',
  'New buyers/MA registrations',
  'Total Accounts',
  'Active Accounts',
  '% Active'
];

const rowsRegister = [
  createData(0, 0, 0, 0, 0, 0),
  createData(1, 0, 0, 0, 0, 0),
  createData(2, 0, 0, 0, 0, 0),
  createData(3, 0, 0, 0, 0, 0),
  createData(4, 0, 0, 0, 0, 0),
  createData(5, 0, 0, 0, 0, 0),
  createData(6, 0, 0, 0, 0, 0),
];

const fieldsTransact = [
  'Product requests',
  'New Offers Created',
  'Offers Out',
  'Completed Transactions',
];

const rowsTransact = [
  createData(0, 0, 0, 0, 0, 0),
  createData(1, 0, 0, 0, 0, 0),
  createData(2, 0, 0, 0, 0, 0),
  createData(3, 0, 0, 0, 0, 0),
];

const urlsServer = [
  'https://devdash.hivefloor.com.au/api/v1/report/users/dashboard',
  'https://devdash.hivefloor.com.au/api/v1/report/offers/dashboard',
  'https://devdash.hivefloor.com.au/api/v1/report/orders/dashboard',
];


const backgroundColors = {
  'New Registrations' : 'normalBackground',
  'Successful Registrations' : 'normalBackground',
  'New seller registrations' : 'normalBackground',
  'New buyers/MA registrations' : 'greenBackground',
  'Total Accounts' : 'normalBackground',
  'Active Accounts' : 'greenBackground',
  '% Active' : 'greenBackground',
  'Product requests' : 'normalBackground',
  'New Offers Created' : 'normalBackground',
  'Offers Out' : 'normalBackground',
  'Completed Transactions' : 'pinkBackground',
};

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  fields: {
    width: '150px',
  },
  registerCell: {
    color: 'white',
    backgroundColor: '#00CC66',
    alignItems: 'center',
    width: '100px',
  },
  transactCell: {
    color: 'white',
    backgroundColor: '#72BCD4',
    alignItems: 'center',
    width: '100px',
  },
  normalCell: {
    fontWeight: 'normal',
  },
  boldCell: {
    fontWeight: 'bold',
  },
  normalBackground: {
    backgroundColor: 'normal',
  },
  greenBackground: {
    backgroundColor: '#A9C9A4',
  },
  pinkBackground: {
    backgroundColor: '#FFEAED',
  }
}));

export default function Characteristics() {
  const [data, setData] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const urlServerDashboard = 'https://devdash.hivefloor.com.au/api/v1/report/users/dashboard'; 
    axios.get(urlServerDashboard, {headers: { 'x-access-token': token}}).then((e) => {
      setData(e.data);
      console.log(e.data);
    });
  }, []);

  return (
    <React.Fragment>
      <br />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell align="center">Previous Month</TableCell>
            <TableCell align="center">Previous Week</TableCell>
            <TableCell align="center">Week Thus Far</TableCell>
            <TableCell align="center">Weekly Goal</TableCell>
            <TableCell align="center">January Thus Far</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={8} align="center" className={classes.registerCell}>
              <span>Register</span>
            </TableCell>
          </TableRow>
          {rowsRegister.map((row, index) => {
            const field = fieldsRegister[index];
            const backgroundColor = backgroundColors[field]; 
            return (
              <TableRow key={row.id}>
                <TableCell className={classes.fields && classes[backgroundColor]}>
                  <span className={field === 'New buyers/MA registrations' ? classes.boldCell : classes.normalCell}>
                    {field}
                  </span>
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >
                  {row.shipTo}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >
                  {row.paymentMethod}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >
                  {row.amount}
                </TableCell>
              </TableRow>
            );
          })}
          <br />
          <TableRow>
          <TableCell rowSpan={8} align="center" className={classes.transactCell}>
              <span>Transact</span>
            </TableCell>
          </TableRow>
          {rowsTransact.map((row, index) => {
            const field = fieldsTransact[index];
            const backgroundColor = backgroundColors[field];
            return (
              <TableRow key={row.id}>
                <TableCell
                  className={classes.fields && classes[backgroundColor]}
                >
                  <span className={field === 'Completed Transactions' ? classes.boldCell : classes.normalCell}>
                    {field}
                  </span>
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.date}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.shipTo}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.paymentMethod}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.amount}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}