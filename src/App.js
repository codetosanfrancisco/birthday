import React, { Component } from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import PrivateRoute from "./utils/PrivateRoute/PrivateRoute";
import BirthdayNew from "./containers/BirthdayNew/BirthdayNew";
import Admin from "./containers/Admin/Admin";

class App extends Component {
  render = () => {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <PrivateRoute
          path="/birthday/new"
          render={props => <BirthdayNew {...props} />}
        />
        <Route path="/admin" render={props => <Admin {...props} />} />
      </Switch>
    );
  };
}

export default App;
