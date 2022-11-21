import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { collection } from "firebase/firestore";
import { database } from "../../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { immediate } from "tone";

function SoundMenu({ handleBeatChange, currentUser }) {
  const [selected, setSelected] = useState("SELECTED");
  const drumsRef = collection(database, "built_in_drums");
  const bassRef = collection(database, "built_in_bass");
  const guitarRef = collection(database, "built_in_guitar");
  const vocalsRef = collection(database, "built_in_vocals");
  const [drums] = useCollectionData(drumsRef);
  const [bass] = useCollectionData(bassRef);
  const [vocals] = useCollectionData(vocalsRef);
  const [guitar] = useCollectionData(guitarRef);

  console.log("CURR USER", currentUser);

  console.log("NAMMMMEEEE💯💯💯💯💯", selected);

  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : `${selected}`}</MenuButton>
      )}
    >
      <SubMenu label="INSTRUMENTS">
        <SubMenu label="drums">
          {drums?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    // value={sound.url}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
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
          {bass?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
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
          {guitar?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
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
          {vocals?.map((docs, i) => {
            return (
              <SubMenu label={docs.id} key={i}>
                {docs.sounds?.map((sound) => (
                  <MenuItem
                    label={sound.name}
                    key={sound.name}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        <SubMenu label="Your Sounds :)">
          {currentUser?.sounds.map((sound, i) => (
            <MenuItem
              label={sound.name}
              key={i}
              onClick={() => {
                handleBeatChange(sound.url);
                setSelected(`${sound.id}-${sound.name}`);
              }}
            >
              {sound.name}
            </MenuItem>
          ))}
        </SubMenu>
      </SubMenu>
    </Menu>
  );
}

export default SoundMenu;
