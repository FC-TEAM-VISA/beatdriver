import React, { useState } from "react";
import { Knob } from "primereact/knob";
// chorus, phaser, reverb, tremolo + mute effect button

function EffectsMenu({
  reverb,
  chorus,
  phaser,
  tremolo,
  setReverb,
  setPhaser,
  setChorus,
  setTremolo,
}) {
  const [value, setValue] = useState(0);

  return (
    <div className="grid col-span-4 place-items-center p-5 scrollbar scrollbar-thumb-red-800 scrollbar-track-mint_cream overflow-y-scroll h-4/5">
      {/* 
        ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄ 
        ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
        ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀ 
        ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          
        ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄ 
        ▐░▌          ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌
        ▐░▌          ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀█░█▀▀ ▐░▌       ▐░▌ ▀▀▀▀▀▀▀▀▀█░▌
        ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌     ▐░▌  ▐░▌       ▐░▌          ▐░▌
        ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌
        ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
        ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀ 
                                                      
       */}
      <div className="grid bg-violet-600 p-5">
        <div>
          <h1>CHORUS</h1>
        </div>
        <div className="flex place-items-center">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={10}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={chorus.frequency}
              onChange={(e) =>
                setChorus({
                  frequency: e.value,
                  delayTime: chorus.delayTime,
                  depth: chorus.depth,
                })
              }
            />
            <label className="col-span-1 text-sm ">FREQUENCY</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={20}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(chorus.delayTime / 1000)}
              onChange={(e) =>
                setChorus({
                  frequency: chorus.frequency,
                  delayTime: e.value * 1000,
                  depth: chorus.depth,
                })
              }
            />
            <label className="col-span-1 text-sm">DELAY</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(chorus.depth * 100)}
              onChange={(e) =>
                setChorus({
                  frequency: chorus.frequency,
                  delayTime: chorus.delayTime,
                  depth: e.value / 100,
                })
              }
            />
            <label className="col-span-1 text-sm">DEPTH</label>
          </div>
        </div>
      </div>
      {/* 
        ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
        ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
        ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌
        ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌          ▐░▌       ▐░▌
        ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌
        ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
        ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀ 
        ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌          ▐░▌▐░▌          ▐░▌     ▐░▌  
        ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌ ▄▄▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌ 
        ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌
        ▀            ▀         ▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀ 
                                                      
       */}
      <div className="grid bg-green-700 p-5 mt-5">
        <div>
          <h1>PHASER</h1>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={10}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={phaser.frequency}
              onChange={(e) =>
                setPhaser({
                  frequency: e.value,
                  octaves: phaser.octaves,
                  baseFrequency: phaser.baseFrequency,
                })
              }
            />
            <label className="col-span-1 text-sm ">FREQUENCY</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={8}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={phaser.octaves}
              onChange={(e) =>
                setPhaser({
                  frequency: phaser.frequency,
                  octaves: e.value,
                  baseFrequency: phaser.baseFrequency,
                })
              }
            />
            <label className="col-span-1 text-sm">OCTAVES</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={100}
              max={1000}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={phaser.baseFrequency}
              onChange={(e) =>
                setPhaser({
                  frequency: phaser.frequency,
                  octaves: phaser.octaves,
                  baseFrequency: e.value,
                })
              }
            />
            <label className="col-span-1 text-sm">BASE FREQ</label>
          </div>
        </div>
      </div>
      {/* 
        ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄               ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄  
        ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌             ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ 
        ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀  ▐░▌           ▐░▌ ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀█░▌
        ▐░▌       ▐░▌▐░▌            ▐░▌         ▐░▌  ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌
        ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄    ▐░▌       ▐░▌   ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌
        ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌    ▐░▌     ▐░▌    ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░▌ 
        ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀▀▀      ▐░▌   ▐░▌     ▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀█░▌
        ▐░▌     ▐░▌  ▐░▌                ▐░▌ ▐░▌      ▐░▌          ▐░▌     ▐░▌  ▐░▌       ▐░▌
        ▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄        ▐░▐░▌       ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄█░▌
        ▐░▌       ▐░▌▐░░░░░░░░░░░▌        ▐░▌        ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░▌ 
        ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀          ▀          ▀▀▀▀▀▀▀▀▀▀▀  ▀         ▀  ▀▀▀▀▀▀▀▀▀▀ 
                                                      
       */}
      <div className="grid bg-blue-500 p-5 mt-5">
        <div>
          <h1>REVERB</h1>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={1}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(reverb.decay * 100)}
              onChange={(e) => setReverb({ decay: e.value / 100 })}
            />
            <label className="col-span-1 text-sm ">REVERB</label>
          </div>
        </div>
      </div>
      {/* 
        ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄       ▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄ 
        ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░▌     ▐░░▌▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌
        ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░▌░▌   ▐░▐░▌▐░█▀▀▀▀▀▀▀█░▌▐░▌          ▐░█▀▀▀▀▀▀▀█░▌
            ▐░▌     ▐░▌       ▐░▌▐░▌          ▐░▌▐░▌ ▐░▌▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌
            ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌ ▐░▐░▌ ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌
            ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌
            ▐░▌     ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌   ▀   ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌
            ▐░▌     ▐░▌     ▐░▌  ▐░▌          ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌          ▐░▌       ▐░▌
            ▐░▌     ▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄ ▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄█░▌
            ▐░▌     ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌                                          
       */}
      <div className="grid bg-red-700 p-5 mt-5">
        <div>
          <h1>TREMOLO</h1>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={30}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={tremolo.frequency}
              onChange={(e) =>
                setTremolo({ frequency: e.value, depth: tremolo.depth })
              }
            />
            <label className="col-span-1 text-sm ">FREQUENCY</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(tremolo.depth * 100)}
              onChange={(e) =>
                setTremolo({
                  frequency: tremolo.frequency,
                  depth: e.value / 100,
                })
              }
            />
            <label className="col-span-1 text-sm">DEPTH</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EffectsMenu;
