import React from "react";

// support lifecycle di komponen fungsi melalui react hooks
function Text(props) {
  //   console.log(props);
  return (
    <div className="wrapper">
      <p>{props.content}</p>
    </div>
  );
}

export default Text;
