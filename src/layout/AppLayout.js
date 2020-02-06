import React, { Fragment } from "react";
import { withRouter} from "react-router-dom";
import NavBar from "../components/NavBar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: '#303030',
    padding: '5px 15px',
    height: '100%',
  },
}));


function AppLayout(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <NavBar />
      <div className={classes.content}>
        {props.children}
      </div>
    </Fragment>
  );
}

export default withRouter(AppLayout);
