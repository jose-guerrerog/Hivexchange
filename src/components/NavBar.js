import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabLink: {
    color: 'white',
    fontSize: '15px',
  },
  tabContainer: {
    float: 'left',
  },
  buttonContainer: {
    paddingRight: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    float: 'right',
  },
}));


const NavBar = (props) => {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem('token');
    props.history.push('/');
  }
  
  return(
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.tabContainer}>
          <Tab 
            label={'DASHBOARD'} 
            className={classes.tabLink}
            component={Link}
            to={'/app/dashboard'}
          />
          <Tab 
            label={'INVOICES'} 
            className={classes.tabLink}
            component={Link}
            to={'/app/invoices'}
          />
          <Tab 
            label={'BILLS'} 
            className={classes.tabLink}
            component={Link}
            to={'/app/bills'}
          />
          </div>
          <div className={classes.buttonContainer}>
            <AccountCircleIcon />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogout()}
              className={classes.button}
            > 
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(NavBar);