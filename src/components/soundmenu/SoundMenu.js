import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { collection } from "firebase/firestore";
import { database } from "../../../utils/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function SoundMenu({
  handleBeatChange,
  currentUser,
  setSelectedInstrument,
  selected,
  setSelected,
}) {
  const drumsRef = collection(database, "built_in_drums");
  const bassRef = collection(database, "built_in_bass");
  const guitarRef = collection(database, "built_in_guitar");
  const vocalsRef = collection(database, "built_in_vocals");
  const [drums] = useCollectionData(drumsRef);
  const [bass] = useCollectionData(bassRef);
  const [vocals] = useCollectionData(vocalsRef);
  const [guitar] = useCollectionData(guitarRef);

  const customSoundsExist = currentUser && currentUser.sounds;

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
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
                      setSelectedInstrument(`DRUMS`);
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
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
                      setSelectedInstrument(`BASS`);
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
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
                      setSelectedInstrument(`GUITAR`);
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
                {docs.sounds?.map((sound, i) => (
                  <MenuItem
                    label={sound.name}
                    key={i}
                    onClick={() => {
                      handleBeatChange(sound.url);
                      setSelected(`${docs.id}-${sound.name}`);
                      setSelectedInstrument(`VOCALS`);
                    }}
                  >
                    {sound.name}
                  </MenuItem>
                ))}
              </SubMenu>
            );
          })}
        </SubMenu>
        {customSoundsExist && (
          <SubMenu label={currentUser?.name}>
            {currentUser?.sounds?.map((sound, i) => (
              <MenuItem
                label={sound.name}
                key={i}
                onClick={() => {
                  handleBeatChange(sound.url);
                  setSelected(`${currentUser?.name}-${sound.name}`);
                  setSelectedInstrument(`USER`);
                }}
              >
                {sound.name}
              </MenuItem>
            ))}
          </SubMenu>
        )}
      </SubMenu>
    </Menu>
  );
}

export default SoundMenu;
