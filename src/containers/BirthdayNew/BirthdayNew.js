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
import axios from "axios";
import { notifyNewRecords } from "../../utils/Socket/Socket";

const scroll = {
  duration: 500,
  delay: 100,
  smooth: true
};

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
          <Element name="Name" className="Element">
            <Name
              value={this.state.form.name.value}
              isValid={this.state.form.name.isValid}
              onChange={this.handleName}
              nextAction={() => scroller.scrollTo("Email", scroll)}
            />
          </Element>

          <Element name="Email" className="Element">
            <Email
              value={this.state.form.email.value}
              isValid={this.state.form.email.isValid}
              onChange={this.handleEmail}
              nextAction={() => scroller.scrollTo("Date", scroll)}
            />
          </Element>

          <Element name="Date" className="Element">
            <Date
              day={this.state.form.day.value}
              month={this.state.form.month.value}
              isValid={
                this.state.form.day.isValid && this.state.form.month.isValid
              }
              handleDay={this.handleDay}
              handleMonth={this.handleMonth}
              nextAction={() => scroller.scrollTo("Submit", scroll)}
            />
          </Element>

          {Object.keys(this.state.form).reduce((acc, current) => {
            return acc && this.state.form[current].isValid;
          }) && (
            <Element name="Submit" className="Element">
              <Submit
                values={this.state}
                handleSubmit={this.handleSubmit}
                modalOpen={this.state.modalOpen}
                newRecord={this.newRecord}
              />
            </Element>
          )}
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
          value: event.target.value,
          isValid: valid
        }
      }
    });
    if (event.key === "Enter" && valid) {
      scroller.scrollTo("Email", scroll);
    }
  };

  handleEmail = event => {
    const valid =
      !validator.contains(event.target.value, "@") &&
      !validator.isEmpty(event.target.value.trim());
    this.setState({
      form: {
        ...this.state.form,
        email: {
          value: event.target.value,
          isValid: valid
        }
      }
    });
    if (event.key === "Enter" && valid) {
      scroller.scrollTo("Date", scroll);
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
          value: event.target.value,
          isValid: valid
        }
      }
    });

    if (event.key === "Enter" && valid && this.state.day.isValid) {
      scroller.scrollTo("Submit", scroll);
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
          value: event.target.value,
          isValid: valid
        }
      }
    });

    if (event.key === "Enter" && valid && this.state.form.month.isValid) {
      scroller.scrollTo("Submit", scroll);
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
