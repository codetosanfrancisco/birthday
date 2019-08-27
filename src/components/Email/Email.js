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
            onChange={event => props.onChange(event)}
            onKeyDown={event => props.onChange(event)}
          />
        </div>

        <div className="Arrow">
          {props.isValid && (
            <FiArrowRightCircle
              size="1.2em"
              onClick={() => props.nextAction()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Email;
