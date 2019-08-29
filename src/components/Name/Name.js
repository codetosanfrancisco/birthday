import React from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import "./Name.scss";

const Name = props => {
  return (
    <div className="Name">
      <div className="Text">What is your first name?</div>
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
      </div>
      {props.isValid && (
        <div
          className="GoNext"
          onClick={() => props.history.push(this.props.nextAction)}
        >
          <div className="Next">Next</div>
          <FiArrowRightCircle color="#ffffff" size="1.5em" />
        </div>
      )}
    </div>
  );
};

export default Name;
