import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import { collection } from "firebase/firestore";
import { database } from "../../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function SoundMenu({ beat, handleBeatChange, setBeat }) {
  const [display, setDisplay] = useState("arrow");
  const [align, setAlign] = useState("center");
  const [position, setPosition] = useState("anchor");
  const [viewScroll, setViewScroll] = useState("auto");

  const drumsRef = collection(database, "built_in_drums");
  const bassRef = collection(database, "built_in_bass");
  const guitarRef = collection(database, "built_in_guitar");
  const vocalsRef = collection(database, "built_in_vocals");
  const [drums] = useCollectionData(drumsRef);
  const [bass] = useCollectionData(bassRef);
  const [vocals] = useCollectionData(vocalsRef);
  const [guitar] = useCollectionData(guitarRef);

  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : "SELECT"}</MenuButton>
      )}
    >
      <SubMenu label="INSTRUMENTS">
        <SubMenu label="drums">
          {drums?.map((docs) => {
            return (
              <SubMenu label={docs.id} key={docs.id}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    // value={sound.url}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      console.log(sound.url);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>

        <SubMenu label="bass">
          {bass?.map((docs) => {
            return (
              <SubMenu label={docs.id} key={docs.id}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      console.log(sound.url);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        <SubMenu label="guitar">
          {guitar?.map((docs) => {
            return (
              <SubMenu label={docs.id} key={docs.id}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      console.log(sound.url);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        <SubMenu label="vocals">
          {vocals?.map((docs) => {
            return (
              <SubMenu label={docs.id} key={docs.id}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      console.log(sound.url);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
      </SubMenu>
    </Menu>
  );
}

export default SoundMenu;
