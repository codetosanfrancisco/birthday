import React, { Component } from "react";
import FadeInAnimation from "../../utils/FadeInAnimation/FadeInAnimation";
import "./BirthdayNew.scss";
import { withRouter } from "react-router-dom";
import Name from "../../components/Name/Name";
import Email from "../../components/Email/Email";
import Date from "../../components/Date/Date";
import Submit from "../../components/Submit/Submit";
import Add from "../../components/Add/Add";
import validator from "validator";
import axios from "axios";
import { notifyNewRecords } from "../../utils/Socket/Socket";
import { Switch, Route } from "react-router-dom";

class BirthdayNew extends Component {
  state = {
    form: {
      name: {
        value: "",
        isValid: false
      },
      email: {
        value: "",
        isValid: false
      },
      month: {
        value: "",
        isValid: false
      },
      day: {
        value: "",
        isValid: false
      }
    },
    modalOpen: false
  };

  componentDidMount = () => {
    if (!this.state.form.name.isValid) {
      this.props.history.push(`${this.props.match.url}`);
    }
  };

  render = () => {
    return (
      <FadeInAnimation>
        <div className="BirthdayNew">
          <Switch>
            <Route
              exact
              path={`${this.props.match.url}`}
              render={props => (
                <Name
                  {...props}
                  value={this.state.form.name.value}
                  isValid={this.state.form.name.isValid}
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
                  value={this.state.form.email.value}
                  isValid={this.state.form.email.isValid}
                  onChange={this.handleEmail}
                  nextAction={`${this.props.match.url}/date`}
                  previousAction={`${this.props.match.url}`}
                />
              )}
            />

            <Route
              path={`${this.props.match.url}/date`}
              render={props => (
                <Date
                  {...props}
                  day={this.state.form.day.value}
                  month={this.state.form.month.value}
                  isValid={
                    this.state.form.day.isValid && this.state.form.month.isValid
                  }
                  handleDay={this.handleDay}
                  handleMonth={this.handleMonth}
                  nextAction={`${this.props.match.url}/submit`}
                  previousAction={`${this.props.match.url}/email`}
                />
              )}
            />

            <Route
              path={`${this.props.match.url}`}
              render={props => (
                <Submit
                  {...props}
                  values={this.state}
                  handleSubmit={this.handleSubmit}
                  modalOpen={this.state.modalOpen}
                  newRecord={this.newRecord}
                  previousAction={`${this.props.match.url}/date`}
                />
              )}
            />
          </Switch>
        </div>
      </FadeInAnimation>
    );
  };

  handleName = event => {
    const valid = !validator.isEmpty(event.target.value.trim());
    this.setState({
      form: {
        ...this.state.form,
        name: {
          value: event.target.value.trim(),
          isValid: valid
        }
      }
    });
    if (event.key === "Enter" && valid) {
      this.props.history.push(`${this.props.match.url}/email`);
    }
  };

  handleEmail = event => {
    const valid =
      //!validator.contains(event.target.value, "@") &&
      !validator.isEmpty(event.target.value.trim());
    this.setState({
      form: {
        ...this.state.form,
        email: {
          value: event.target.value.trim(),
          isValid: valid
        }
      }
    });
    if (event.key === "Enter" && valid) {
      this.props.history.push(`${this.props.match.url}/date`);
    }
  };

  handleMonth = event => {
    const valid =
      !validator.isEmpty(event.target.value.trim()) &&
      validator.isInt(event.target.value) &&
      event.target.value > 0 &&
      event.target.value <= 12;
    this.setState({
      form: {
        ...this.state.form,
        month: {
          value: event.target.value.trim(),
          isValid: valid
        }
      }
    });

    if (event.key === "Enter" && valid && this.state.day.isValid) {
      this.props.history.push(`${this.props.match.url}/submit`);
    }
  };

  handleDay = event => {
    const valid =
      !validator.isEmpty(event.target.value.trim()) &&
      validator.isInt(event.target.value) &&
      event.target.value > 0 &&
      event.target.value <= 31;
    this.setState({
      form: {
        ...this.state.form,
        day: {
          value: event.target.value.trim(),
          isValid: valid
        }
      }
    });

    if (event.key === "Enter" && valid && this.state.form.month.isValid) {
      this.props.history.push(`${this.props.match.url}/submit`);
    }
  };

  handleSubmit = () => {
    axios
      .post(
        "http://localhost:8080",
        {
          name: this.state.form.name.value,
          email: this.state.form.email.value,
          day: this.state.form.day.value,
          month: this.state.form.month.value
        },
        {
          headers: {
            yesunmc: "yesunmc3ksth"
          }
        }
      )
      .then(response => {
        notifyNewRecords();
        this.setState({ modalOpen: true });
      })
      .catch(err => {
        alert("Record is invalid!");
      });
  };

  newRecord = () => {
    window.location.href = `${this.props.match.url}`;
  };
}

export default withRouter(BirthdayNew);
