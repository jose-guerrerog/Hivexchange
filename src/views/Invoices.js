import React, { useState, useEffect } from 'react';
import {
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CSVLink } from "react-csv";
import axios from 'axios';
import GetAppIcon from '@material-ui/icons/GetApp';
import TablePaginationActions from '../components/TablePaginationActions';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  pageContainer: {
    paddingLeft: '55px',
    paddingRight: '55px',
  },
  titleTable: {
    fontWeight: 'bold',
    fontSize: '40px',
    paddingTop: '15px',
    paddingBottom: '15px',
    color: '#FFFFFF',
  },
  dateContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  dateText: {
    fontSize: '20px',
    fontWeight: 'bold',
    paddingRight: '25px',
    color: '#FFFFFF',
  },
  subMenu: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  pagination: {
    borderBottom: 'none',
  }
}));


function Invoices(props) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [invoices, setInvoices] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = localStorage.getItem('token');
  const invoiceList = invoices.list && invoices.list.length > 0 ? 
      invoices.list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];
  const classes = useStyles1();
  
  useEffect(() => {
    const url = `${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/orders/invoices?order=name&pageSize=50&page=1`;
    axios.get(url, {headers: { 'x-access-token': token}}).then((res) => {
      setInvoices(res.data);
    });    
  }, []);

  const getFormatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();

    const formatMonth = month < 10 ? '0' + month : month;
    const formatDay = day < 10 ? '0' + day : day;
  
    return year + '-' + formatMonth + '-' + formatDay;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const startDate = getFormatDate(date);
    const url = `${process.env.REACT_APP_BASE_API_ENDPOINT}/api/v1/report/orders/invoices?order=name&startDate=${startDate}`;
    axios.get(url, {headers: { 'x-access-token': token}}).then((res) => {
      setInvoices(res.data);
    });
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.titleTable}>
        Invoices
      </div>
      <div className={classes.dateContainer}>
        <span className={classes.dateText}>
          Invoice Date
        </span>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            clearable
            value = {selectedDate}
            placeholder="Enter date"
            onChange={date => handleDateChange(date)}
            format="dd/MM/yyyy"
          />
        </MuiPickersUtilsProvider>
      </div>
      <br />
      <div className={classes.subMenu}>
        
      <CSVLink
        data={invoiceList}
        filename="invoices.csv"
      >
        <IconButton aria-label="download">
          <GetAppIcon />
        </IconButton>
      </CSVLink>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 50, 75, { label: 'All', value: -1}]}
        colSpan={4}
        count={invoices.list && invoices.list.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Invoice Id</TableCell>
            <TableCell align="center">Invoice Date</TableCell>
            <TableCell align="center">Amount</TableCell>
            <TableCell align="center">Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            invoiceList.map(({invoiceId, amount, company, invoiceDate}) => (
              <TableRow key={invoiceId}>
                <TableCell align="center">
                  {invoiceId}
                </TableCell>
                <TableCell align="center">
                  {invoiceDate}
                </TableCell>
                <TableCell align="center">                  
                  {`$${amount}`}
                </TableCell>
                <TableCell align="center">
                  {company}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}

export default Invoices;