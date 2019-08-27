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
import { Element, scroller } from "react-scroll";

const scroll = {
  duration: 500,
  delay: 100,
  smooth: true
};

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
    month: {
      value: "",
      isValid: false
    },
    day: {
      value: "",
      isValid: false
    }
  };

  componentDidMount = () => {
    if (!this.state.name.isValid) {
      this.props.history.push(`${this.props.match.url}`);
    }
  };

  render = () => {
    return (
      <FadeInAnimation>
        <div className="BirthdayNew">
          <Element name="Name" className="Element">
            <Name
              value={this.state.name.value}
              isValid={this.state.name.isValid}
              onChange={this.handleName}
              nextAction={() => scroller.scrollTo("Email", scroll)}
            />
          </Element>

          <Element name="Email" className="Element">
            <Email
              value={this.state.email.value}
              isValid={this.state.email.isValid}
              onChange={this.handleEmail}
              nextAction={() => scroller.scrollTo("Date", scroll)}
            />
          </Element>

          <Element name="Date" className="Element">
            <Date
              day={this.state.day.value}
              month={this.state.month.value}
              isValid={this.state.day.isValid && this.state.month.isValid}
              handleDay={this.handleDay}
              handleMonth={this.handleMonth}
              nextAction={() => scroller.scrollTo("Submit", scroll)}
            />
          </Element>

          <Element name="Submit" className="Element">
            <Submit values={this.state} />
          </Element>
        </div>
      </FadeInAnimation>
    );
  };

  handleName = event => {
    const valid = !validator.isEmpty(event.target.value);
    this.setState({
      name: {
        value: event.target.value,
        isValid: valid
      }
    });
    if (event.key === "Enter" && valid) {
      scroller.scrollTo("Email", scroll);
    }
  };

  handleEmail = event => {
    const valid =
      !validator.contains(event.target.value, "@") &&
      !validator.isEmpty(event.target.value);
    this.setState({
      email: {
        value: event.target.value,
        isValid: valid
      }
    });
    if (event.key === "Enter" && valid) {
      scroller.scrollTo("Date", scroll);
    }
  };

  handleMonth = event => {
    const valid =
      !validator.isEmpty(event.target.value) &&
      validator.isInt(event.target.value) &&
      event.target.value > 0 &&
      event.target.value <= 12;
    this.setState({
      month: {
        value: event.target.value,
        isValid: valid
      }
    });

    if (event.key === "Enter" && valid && this.state.day.isValid) {
      scroller.scrollTo("Submit", scroll);
    }
  };

  handleDay = event => {
    const valid =
      !validator.isEmpty(event.target.value) &&
      validator.isInt(event.target.value) &&
      event.target.value > 0 &&
      event.target.value <= 31;
    this.setState({
      day: {
        value: event.target.value,
        isValid: valid
      }
    });

    if (event.key === "Enter" && valid && this.state.month.isValid) {
      scroller.scrollTo("Submit", scroll);
    }
  };
}

export default withRouter(BirthdayNew);
