import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import DashboardChart from '../data/DashboardChart';

const timeIntervals = [
  'lastMonth',
  'lastWeek',
  'thisMonth',
  'thisWeek',
];

const fieldsRegister = [
  'New Users',
];

const fieldsTransact = [
  {label: 'New Offers', value: 'idk'},
  {label: 'Pending Orders', value: 'pending'},
  {label: 'Platform Profit', value: 'platformProfit'},
  {label: 'Broker Profit', value: 'brokerProfit'},
  {label: 'Completed Transactions', value: 'count'},
  {label: 'Total', value: 'total'},
];

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
  headCell: {
    fontWeight: 'bold',
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
  circularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '30px',
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

const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
export default function Characteristics() {
  const [data, setData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const classes = useStyles();
  
  const getFormattedDate = (date, isMonth) => {
    if (!date)
      return '';
    const dateComponents = date.split('-');
    const formattedMonth = months[Number(dateComponents[1]) - 1];
    if (isMonth) {
      return `${formattedMonth} ${dateComponents[0]}`
    }
    return `${dateComponents[2]} ${formattedMonth} ${dateComponents[0]}`;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    const promise1 = axios.get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/users/dashboard`, {headers: { 'x-access-token': token}});
    const promise2 = axios.get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/orders/dashboard`, {headers: { 'x-access-token': token}});
    const promise3 = axios.get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/offers/dashboard`, {headers: { 'x-access-token': token}});
    const promise4 = axios.get(`${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/orders/longSummary`, {headers: { 'x-access-token': token}});

    Promise.all([promise1, promise2, promise3, promise4]).then(function(values) {
      setIsDataLoaded(true);
      let startDate = [];
      let platform = [];
      let broker = [];
      values[3].data.reverse().map(data => {
        startDate.push(getFormattedDate(data.start, true));
        platform.push(data.platform || '0');
        broker.push(data.broker || '0');
      });

      const profits = {
        series: [{
          name: 'Platform',
          data: platform,
        }, {
          name: 'Broker',
          data: broker
        }],
        categories: startDate,
      };

      const dataLoaded = {
        users: values[0].data,
        orders: values[1].data,
        profits,
      };

      console.log(profits);
      setData(dataLoaded);
    });
  }, []);

  if (!isDataLoaded) {
    return (
      <div className={classes.circularProgress}><CircularProgress /></div>
    )
  }

  const formatter = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 2
  });

  const dataRegister = data ? data.users : {};
  const dataTransact = data ? data.orders : {};
  const dates = data ? data.users.dates : {};

  return (
    <React.Fragment>
      <br />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}></TableCell>
            <TableCell align="center">
              <div className={classes.headCell}>
                <div>
                  Previous Month
                </div>
                <div>
                  {`${getFormattedDate(dates.startOfLastMonth, true)}`}
                </div>
              </div>
            </TableCell>
            <TableCell align="center">
              <div className={classes.headCell}>
                <div>
                  Previous Week
                </div>
                <div>
                  {`${getFormattedDate(dates.startOfLastWeek)}`}
                </div>
              </div>
            </TableCell>
            <TableCell align="center">
              <div className={classes.headCell}>
                <div>
                  Current Month
                </div>
                <div>
                  {`${getFormattedDate(dates.startOfMonth, true)}`}
                </div>
              </div>
            </TableCell>
            <TableCell align="center">
              <div className={classes.headCell}>
                <div>
                  Current Week
                </div>
                <div>
                  {`${getFormattedDate(dates.startOfWeek)}`}
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell rowSpan={2} align="center" className={classes.registerCell}>
              <span>Register</span>
            </TableCell>
          </TableRow>
          {fieldsRegister.map((field, index) => {
            const backgroundColor = backgroundColors[field];
            return (
              <TableRow key={field.id}>
                <TableCell className={classes.fields && classes[backgroundColor]}>
                  <span className={field === 'New buyers/MA registrations' ? classes.boldCell : classes.normalCell}>
                    {field}
                  </span>
                </TableCell>
                {timeIntervals.map((interval, index) => {
                  return (
                    <TableCell
                      align="center"
                    >
                      {dataRegister && dataRegister[interval] && dataRegister[interval].length || '0'}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          <br />
          <TableRow>
          <TableCell rowSpan={10} align="center" className={classes.transactCell}>
              <span>Transact</span>
            </TableCell>
          </TableRow>
          {fieldsTransact.map((field, index) => {
            const isAmount = field.value === 'total' || field.value === 'platformProfit' || field.value === 'brokerProfit';
            return (
              <TableRow>
                <TableCell>
                  {field.label}
                </TableCell>
                {timeIntervals.map((interval, index) => {
                  const value = dataTransact && dataTransact[interval] && dataTransact[interval][field.value] || '0';
                  const displayedValue = isAmount ? formatter.format(value) : value;
                  return (
                    <TableCell
                      align="center"
                    >
                      {displayedValue}
                    </TableCell>
                  );
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <br />
      <br />
      <DashboardChart data={data && data.profits || {}} />
    </React.Fragment>
  );
}