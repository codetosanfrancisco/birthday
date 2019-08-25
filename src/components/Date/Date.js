import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "./Date.scss";

class Date extends Component {
  render = () => {
    return (
      <div className="Date">
        <AliceCarousel
          mouseDragEnabled={true}
          dotsDisabled={true}
          infinite={true}
          startIndex={0}
        >
          <div style={{ backgroundColor: "yellow" }}>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
          <div>Hello</div>
        </AliceCarousel>
      </div>
    );
  };
}

export default Date;
