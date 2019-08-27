import React, { Component } from "react";
import "./Date.scss";
import { FiArrowLeftCircle, FiArrowDownCircle } from "react-icons/fi";

class Date extends Component {
  render = () => {
    return (
      <div className="Date">
        <div className="When">When is your birthday ?</div>
        <div className="Birthday">
          <div className="Month">
            <div>
              <input
                className="Input"
                onChange={event => this.props.handleMonth(event)}
                onKeyDown={event => this.props.handleMonth(event)}
                value={this.props.month}
              />
            </div>
            <div className="SubText">Month (eg : 10)</div>
          </div>
          <div className="Dash">
            <div className="Line"></div>
          </div>
          <div className="Day">
            <div>
              <input
                className="Input"
                onChange={event => this.props.handleDay(event)}
                onKeyDown={event => this.props.handleDay(event)}
                value={this.props.day}
              />
            </div>
            <div className="SubText">Day (eg: 23)</div>
          </div>
        </div>
        {this.props.isValid && (
          <div className="GoNext" onClick={() => this.props.nextAction()}>
            <div className="Next">Next</div>
            <FiArrowDownCircle color="#ffffff" size="1.5em" />
          </div>
        )}
      </div>
    );
  };
}

export default Date;
