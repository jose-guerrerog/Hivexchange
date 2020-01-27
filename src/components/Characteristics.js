import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const fieldsRegister = [
  'New Users',
];

const fieldsTransact = [
  'New Offers',
  'Completed Transactions',
];

const rowsTransact = [
  createData(0, 0, 0, 0, 0, 0),
  createData(1, 0, 0, 0, 0, 0),
];

const urlsData = {
  'https://devdash.hivefloor.com.au/api/v1/report/users/dashboard' : '',
  'https://devdash.hivefloor.com.au/api/v1/report/orders/dashboard' : 'sales',
  'https://devdash.hivefloor.com.au/api/v1/report/offers/dashboard' : 'offers',
};

const backgroundColors = {
  'New Users' : 'normalBackground',
  'New Offers' : 'normalBackground',
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
  },
}));

const dataRows = [];

export default function Characteristics() {
  const [users, setUsers] = useState([]);
  const [transactRows, setTransactRows] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    const token = localStorage.getItem('token');

    const promise1 = axios.get('https://devdash.hivefloor.com.au/api/v1/report/users/dashboard', {headers: { 'x-access-token': token}});
    const promise2 = axios.get('https://devdash.hivefloor.com.au/api/v1/report/orders/dashboard', {headers: { 'x-access-token': token}});
    const promise3 = axios.get('https://devdash.hivefloor.com.au/api/v1/report/offers/dashboard', {headers: { 'x-access-token': token}});
      
    Promise.all([promise1, promise2, promise3]).then(function(values) {
      let rUsers = [];
      let tRows = [];
      values.map(value => {
        const type = urlsData[value.config.url];
        if (type === '') {
          setUsers(rUsers.concat(value.data));
        } else {
          tRows.push({'type': type, 'value': value.data}); 
        }
      });
      setTransactRows(tRows);
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
            <TableCell align="center">Current Month</TableCell>
            <TableCell align="center">Current Week</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={2} align="center" className={classes.registerCell}>
              <span>Register</span>
            </TableCell>
          </TableRow>
          {users.map((row, index) => {
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
                  {row.lastMonth && row.lastMonth.length}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >                  
                  {row.lastWeek && row.lastWeek.length}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >
                  {row.thisMonth && row.thisMonth.length}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes.fields && classes[backgroundColor]}
                >
                  {row.thisWeek && row.thisWeek.length}
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
          {transactRows.map((row, index) => {
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
                  {row.value.lastMonth[row.type].length}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.value.lastWeek[row.type].length}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.value.thisMonth[row.type].length}
                </TableCell>
                <TableCell
                  align="center"
                  className={classes[backgroundColor]}
                >
                  {row.value.thisWeek[row.type].length}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}