import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

function LoadMenu({ projects, setGrid }) {
  // console.log(projects[0].grid);
  const handleLoad = async (project) => {
    console.log("📓", project);
    const objGrid = project?.grid;
    console.log(objGrid);
    const loadGrid = Object.values(objGrid).map((row) => row);
    console.log(loadGrid);
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
          <MenuItem onClick={() => handleLoad(project)}>
            {project.name}
          </MenuItem>
        </>
      ))}
    </Menu>
  );
}

export default LoadMenu;
