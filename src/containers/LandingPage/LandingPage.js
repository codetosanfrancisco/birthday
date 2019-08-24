import React, { Component } from "react";
import "./LandingPage.scss";
import logo from "../../assets/images/logo.png";
import Radium, { StyleRoot } from "radium";
import { bounce } from "react-animations";
import validator from "validator";
import Cookies from "js-cookie";
import { withRouter } from "react-router-dom";

class LandingPage extends Component {
  state = {
    password: ""
  };

  render = () => {
    return (
      <StyleRoot>
        <div className="LandingPage">
          <div style={styles.LogoContainer} className="LogoContainer">
            <img src={logo} alt="YES" className="Logo" />
          </div>
          <div className="InputContainer">
            <div className="Text">Hey! It's yesunmc!</div>
            <input
              className="Input"
              value={this.state.password}
              onChange={event => this.handleChange(event.target.value)}
            />
          </div>
        </div>
      </StyleRoot>
    );
  };

  handleChange = value => {
    this.setState({ password: value });
    if (validator.equals(value, "yesunmc3ksth")) {
      Cookies.set("yesunmc", true);
      this.props.history.push("/birthday/new");
    }
  };

  componentWillMount = () => {
    if (Cookies.get("yesunmc")) {
      this.props.history.push("/birthday/new");
    }
  };
}

const styles = {
  LogoContainer: {
    animation: "x 1s infinite",
    animationName: Radium.keyframes(bounce)
  }
};

export default withRouter(LandingPage);
