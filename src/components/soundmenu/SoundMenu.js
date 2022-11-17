import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

function SoundMenu({ beat, handleBeatChange }) {
  const [display, setDisplay] = useState("arrow");
  const [align, setAlign] = useState("center");
  const [position, setPosition] = useState("anchor");
  const [viewScroll, setViewScroll] = useState("auto");

  // console.log(beat);
  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : "SELECT"}</MenuButton>
      )}
    >
      <SubMenu label="INSTRUMENTS">
        {/* GUITAR */}
        <SubMenu label="GUITAR">
          <SubMenu label="ACOUSTIC">
            <MenuItem>about.css</MenuItem>
          </SubMenu>
          <SubMenu label="ELECTRIC">
            <MenuItem>about.css</MenuItem>
          </SubMenu>
        </SubMenu>
        {/* BASS */}
        <SubMenu label="BASS">
          <MenuItem value="./samples/bass/nycbass_A.wav">NYC BASS A</MenuItem>
        </SubMenu>
        {/* DRUMS */}
        <SubMenu label="DRUMS">
          <SubMenu label="CLAP">
            <MenuItem value="./samples/drums/clap-808.wav">808</MenuItem>
            <MenuItem value="./samples/drums/clap-analog.wav">ANALOG</MenuItem>
            <MenuItem value="./samples/drums/clap-crushed.wav">
              CRUSHED
            </MenuItem>
          </SubMenu>
          <SubMenu label="HI-HAT">
            <MenuItem value="./samples/drums/hihat-plain.wav">PLAIN</MenuItem>
          </SubMenu>
          <SubMenu label="KICK" direction={"left"}>
            <MenuItem value="./samples/drums/kick-808.wav">808</MenuItem>
          </SubMenu>
          <SubMenu label="SNARE" direction={"left"}>
            <MenuItem value="./samples/drums/snare-punch.wav">PUNCH</MenuItem>
          </SubMenu>
          <SubMenu label="TOMS" direction={"left"}>
            <MenuItem value="./samples/drums/tom-analog.wav">ANALOG</MenuItem>
          </SubMenu>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
}

export default SoundMenu;
