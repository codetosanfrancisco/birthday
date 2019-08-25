import React, { Component } from "react";
import FadeInAnimation from "../../utils/FadeInAnimation/FadeInAnimation";
import "./BirthdayNew.scss";
import { withRouter, Switch, Route } from "react-router-dom";
import Name from "../../components/Name/Name";
import Email from "../../components/Email/Email";
import Date from "../../components/Date/Date";
import Submit from "../../components/Submit/Submit";
import Add from "../../components/Add/Add";
import validator from "validator";

class BirthdayNew extends Component {
  state = {
    name: {
      value: "",
      isValid: false
    },
    email: {
      value: "",
      isValid: false
    },
    date: {
      value: "",
      isValid: false
    }
  };

  render = () => {
    return (
      <FadeInAnimation>
        <div className="BirthdayNew">
          <Switch>
            <Route
              exact
              path={`${this.props.match.url}/`}
              render={props => (
                <Name
                  {...props}
                  value={this.state.name.value}
                  isValid={this.state.name.isValid}
                  onChange={this.handleName}
                  nextAction={`${this.props.match.url}/email`}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/email`}
              render={props => (
                <Email
                  {...props}
                  value={this.state.email.value}
                  isValid={this.state.email.isValid}
                  onChange={this.handleEmail}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/date`}
              render={props => (
                <Date
                  {...props}
                  value={this.state.date.value}
                  isValid={this.state.date.isValid}
                  onChange={this.handleDate}
                />
              )}
            />
            <Route
              path={`${this.props.match.url}/submit`}
              render={props => <Submit {...props} />}
            />
            <Route
              path={`${this.props.match.url}/add`}
              render={props => <Add {...props} />}
            />
          </Switch>
        </div>
      </FadeInAnimation>
    );
  };

  handleName = value => {
    const valid = !validator.isEmpty(value);
    this.setState({
      name: {
        value: value,
        isValid: valid
      }
    });
  };

  handleEmail = value => {
    const valid = !validator.contains(value, "@") && !validator.isEmpty(value);
    this.setState({
      email: {
        value: value,
        isValid: valid
      }
    });
  };

  handleDate = value => {
    const valid = validator.isISO8601(value) && !validator.isEmpty(value);
    this.setState({
      date: {
        value: value,
        isValid: valid
      }
    });
  };
}

export default withRouter(BirthdayNew);
