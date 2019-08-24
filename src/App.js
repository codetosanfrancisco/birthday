import React from "react";
import "./App.scss";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import PrivateRoute from "./utils/PrivateRoute/PrivateRoute";
import BirthdayNew from "./containers/BirthdayNew/BirthdayNew";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <PrivateRoute path="/birthday/new" component={BirthdayNew} />
    </Switch>
  );
}

export default App;
