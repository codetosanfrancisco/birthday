import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from "js-cookie";

class PrivateRoute extends Component {
  render = () => {
    return (
      <Route
        path={this.props.path}
        render={props =>
          this.checkAuthentication() ? (
            <this.props.component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  };

  checkAuthentication = () => {
    if (Cookies.get("yesunmc")) {
      return true;
    }
    return false;
  };
}

export default PrivateRoute;
