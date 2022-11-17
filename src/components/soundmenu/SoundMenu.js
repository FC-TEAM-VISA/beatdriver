import React, { useState } from "react";
import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";

function SoundMenu({ beat, handleBeatChange }) {
  const [display, setDisplay] = useState("arrow");
  const [align, setAlign] = useState("center");
  const [position, setPosition] = useState("anchor");
  const [viewScroll, setViewScroll] = useState("auto");
  const [selected, setSelected] = useState(null);
  const [directory, setDirectory] = useState([]);
  const [files, setFiles] = useState([]);

  const storage = getStorage();
  const listRef = ref(storage, "built-in-instruments");

  listAll(listRef).then((res) => {
    let folders = [];
    res.prefixes.forEach((folderRef) => {
      folders.push(folderRef.name);
    });
    setDirectory(folders);
  });

  // console.log(directory);

  const getFiles = (folderName) => {
    const currentFolder = ref(storage, `built-in-instruments/${folderName}`);
    listAll(currentFolder).then((res) => {
      let allFiles = [];
      res.items.forEach((itemsRef) => {
        allFiles.push(itemsRef.name);
        // console.log(itemsRef);
      });
      setFiles(allFiles);
      // console.log(files, "files");
    });
    return files;
  };

  // console.log(getFiles("bass"));

  // getFiles("bass");

  return (
    <Menu
      menuButton={({ open }) => (
        <MenuButton>{open ? "CLOSE PANEL" : "SELECT"}</MenuButton>
      )}
    >
      <SubMenu label="INSTRUMENTS">
        {directory.map((folder) => {
          return (
            <SubMenu
              label={folder}
              key={folder}
              onMouseOver={() => getFiles(folder)}
            >
              {files?.map((file) => {
                return <SubMenu label={file} key={file} />;
              })}
            </SubMenu>
          );
        })}
      </SubMenu>
    </Menu>
  );
}

export default SoundMenu;

//  {
//    /* GUITAR */
//  }
//  <SubMenu label="GUITAR">
//    <SubMenu label="ACOUSTIC">
//      <MenuItem>about.css</MenuItem>
//    </SubMenu>
//    <SubMenu label="ELECTRIC">
//      <MenuItem>about.css</MenuItem>
//    </SubMenu>
//  </SubMenu>;
//  {
//    /* BASS */
//  }
//  <SubMenu label="BASS">
//    <MenuItem value="./samples/bass/nycbass_A.wav">NYC BASS A</MenuItem>
//  </SubMenu>;
//  {
//    /* DRUMS */
//  }
//  <SubMenu label="DRUMS">
//    <SubMenu label="CLAP">
//      <MenuItem value="./samples/drums/clap-808.wav">808</MenuItem>
//      <MenuItem value="./samples/drums/clap-analog.wav">ANALOG</MenuItem>
//      <MenuItem value="./samples/drums/clap-crushed.wav">CRUSHED</MenuItem>
//    </SubMenu>
//    <SubMenu label="HI-HAT">
//      <MenuItem value="./samples/drums/hihat-plain.wav">PLAIN</MenuItem>
//    </SubMenu>
//    <SubMenu label="KICK" direction={"left"}>
//      <MenuItem value="./samples/drums/kick-808.wav">808</MenuItem>
//    </SubMenu>
//    <SubMenu label="SNARE" direction={"left"}>
//      <MenuItem value="./samples/drums/snare-punch.wav">PUNCH</MenuItem>
//    </SubMenu>
//    <SubMenu label="TOMS" direction={"left"}>
//      <MenuItem value="./samples/drums/tom-analog.wav">ANALOG</MenuItem>
//    </SubMenu>
//  </SubMenu>;
