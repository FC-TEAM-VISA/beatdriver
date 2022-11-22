import React from "react";

function ElementMaker(props) {
  return (
    <span>
      {props.showInputEle ? (
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
          className="min-w-100 h-25 ml-5"
        >
          {props.value}
        </span>
      )}
    </span>
  );
}

export default ElementMaker;
