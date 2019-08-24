import React, { Component } from "react";
import { fadeIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

class FadeInAnimation extends Component {
    render = () => {
        return (
            <StyleRoot>
                <div style={styles.FadeIn}>{this.props.children}</div>
            </StyleRoot>
        );
    };
}

const styles = {
    FadeIn: {
        animation: "x 1s",
        animationName: Radium.keyframes(fadeIn)
    }
};

export default FadeInAnimation;
