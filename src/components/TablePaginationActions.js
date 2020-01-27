import React, {useState, useEffect, Fragment} from 'react';
import {
  Table,
  TablePagination,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { CSVLink, CSVDownload } from "react-csv";
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  titleTable: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  pagination: {
    borderBottom: 'none',
  }
}));


function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default TablePaginationActions;
