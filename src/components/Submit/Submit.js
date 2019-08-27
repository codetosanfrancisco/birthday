import React from "react";
import "./Submit.scss";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const Submit = props => {
  return (
    <div className="Submit">
      <div>Hi</div>
      <div>{props.values.name.value}</div>
      <div>Your nottingham email is {props.values.email.value}</div>
      <div>
        You were born on {months[props.values.month.value - 1]}{" "}
        {props.values.day.value}
      </div>
    </div>
  );
};

export default Submit;
