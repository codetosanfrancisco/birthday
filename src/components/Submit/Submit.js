import React from "react";
import "./Submit.scss";
import ReactTypingEffect from "react-typing-effect";
import Modal from "react-modal";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

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
  const text = `${props.values.form.name.value}, Welcome to YES`;
  return (
    <div className="Submit">
      <Modal isOpen={props.modalOpen} style={styles}>
        <div className="Modal">
          <IoIosCheckmarkCircleOutline size="13em" color="#324d5c" />
          <div className="Text">Received by YES!</div>
          <div className="SubText">Look forward to your birthday!</div>
          <button className="Button" onClick={props.newRecord}>
            New Records
          </button>
        </div>
      </Modal>
      <ReactTypingEffect text={text} className="Typing" speed={200} />
      <div>
        Your nottingham email is{" "}
        <span className="SubmitEmail">
          {props.values.form.email.value}@nottingham.edu.my
        </span>
      </div>
      <div>
        You were born on{" "}
        <span className="SubmitDate">
          {months[props.values.form.month.value - 1]}{" "}
          {props.values.form.day.value}
        </span>
      </div>
      <div className="ConfirmButtonContainer">
        <button class="ConfirmButton" onClick={props.handleSubmit}>
          Confirm your details
        </button>
      </div>
    </div>
  );
};

const styles = {
  content: {
    width: "40vw",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
};

export default Submit;
