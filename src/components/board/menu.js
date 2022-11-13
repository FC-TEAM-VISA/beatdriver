import React from "react";
import ContextMenu from "./contextMenu";

const Menu = () => {
  const { anchorPoint, show } = ContextMenu();

  return show ? (
    <ul
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      style={{ top: anchorPoint.y, left: anchorPoint.x }}
    >
      <p>
        <b>BASS</b>
      </p>
      <li>Cut</li>
      <li>Copy</li>
      <li>Paste</li>
      <hr />
      <li>Refresh</li>
      <li>Exit</li>
    </ul>
  ) : null;
};

export default Menu;
