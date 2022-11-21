// ElementMaker.js

import React from "react";

function ElementMaker(props) {
  return (
    // Render a <span> element
    <span>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        props.showInputEle ? (
          <input
            type="text"
            value={props.value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            autoFocus
            className="ml-5"
          />
        ) : (
          <span
            onDoubleClick={props.handleDoubleClick}
            // style={{
            //   display: "inline-block",
            //   height: "25px",
            //   minWidth: "100px",
            // }}
            className="min-w-100 h-25 ml-5"
          >
            {props.value}
          </span>
        )
      }
    </span>
  );
}

export default ElementMaker;
