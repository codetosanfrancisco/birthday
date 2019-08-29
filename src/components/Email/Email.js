import React from "react";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import "./Email.scss";

const Email = props => {
  return (
    <div className="Email">
      <div className="Text">What is your nottingham email?</div>
      <div className="SubText">eg: efysv1 </div>
      <div className="Container">
        <div className="InputContainer">
          <input
            className="Input"
            value={props.value}
            onChange={event => props.onChange(event)}
            onKeyDown={event => props.onChange(event)}
            autoFocus
          />
        </div>

        <div className="EmailPost">@nottingham.edu.my</div>
      </div>
      {props.isValid && (
        <div
          className="GoNext"
          onClick={() => props.history.push(props.nextAction)}
        >
          <div className="Next">Next</div>
          <FiArrowRightCircle color="#ffffff" size="1.5em" />
        </div>
      )}
      <div
        className="GoBack"
        onClick={() => props.history.push(props.previousAction)}
      >
        <div>
          <FiArrowLeftCircle color="#ffffff" size="1.2rem" />
        </div>
        <div className="Back">Back</div>
      </div>
    </div>
  );
};

export default Email;
