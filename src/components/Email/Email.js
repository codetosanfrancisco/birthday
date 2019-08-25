import React from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import "./Email.scss";
import { FiArrowLeftCircle } from "react-icons/fi";

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
            onChange={event => props.onChange(event.target.value)}
          />
        </div>

        <div className="Arrow">
          {props.isValid && (
            <FiArrowRightCircle
              size="1.2em"
              onClick={() => props.history.push(props.nextAction)}
            />
          )}
        </div>
      </div>
      <div className="GoBack" onClick={() => props.history.goBack()}>
        <FiArrowLeftCircle color="#ffffff" size="1.5em" />
        <div className="Back">Back</div>
      </div>
    </div>
  );
};

export default Email;
