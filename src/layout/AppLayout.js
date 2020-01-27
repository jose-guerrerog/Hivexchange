import React, { Fragment } from "react";
import { withRouter} from "react-router-dom";
import NavBar from "../components/NavBar";

function AppLayout(props) {
  return (
    <Fragment>
      <NavBar />
      <>
        {props.children}
      </>
    </Fragment>
  );
}

export default withRouter(AppLayout);
