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
    </div>
  );
};

export default Name;
