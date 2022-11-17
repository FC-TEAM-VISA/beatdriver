import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

function LoadMenu() {
  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : "LOAD PROJECT"}</MenuButton>
      )}
    >
      <MenuItem>MAP THEM HERE</MenuItem>
    </Menu>
  );
}

export default LoadMenu;
