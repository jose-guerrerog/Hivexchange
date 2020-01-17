import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },
  button: {
    color: 'white',
    "&:hover": {
      backgroundColor: "#FF9900",
    }
  }
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
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleLogout()}
            className={classes.button}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default withRouter(NavBar);