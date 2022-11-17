import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

function LoadMenu({ projects, setGrid }) {
  // console.log(projects[0].grid);
  const handleLoad = (project) => {
    const objGrid = project.grid;
    const orderedKeys = Object.keys(objGrid).sort();
    const loadGrid = orderedKeys.map((row) => objGrid[row]);

    setGrid(loadGrid);
  };

  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : "LOAD PROJECT"}</MenuButton>
      )}
    >
      {projects?.map((project) => (
        <>
          <MenuItem
            onClick={() => {
              handleLoad(project);
              console.log(project.grid);
            }}
          >
            {project.name}
          </MenuItem>
        </>
      ))}
    </Menu>
  );
}

export default LoadMenu;
