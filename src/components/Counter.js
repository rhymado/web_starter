import React from "react";

class Counter extends React.Component {
  //   console.log("update");
  render() {
    return (
      <div className="button-wrapper">
        <button onClick={this.props.onClickPrev}>prev</button>
        <p>{this.props.counterNumber}</p>
        <button onClick={this.props.onClickNext}>next</button>
      </div>
    );
  }
}

export default Counter;
