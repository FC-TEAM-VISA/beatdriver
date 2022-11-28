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
  return (
    <div className="grid grid-cols-2 place-items-center p-5 scrollbar scrollbar-thumb-red-800 scrollbar-track-mint_cream overflow-y-scroll h-4/5">
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
      <div className="grid col-span-2 bg-violet-600 px-10 py-5">
        <div>
          <h1>CHORUS</h1>
        </div>
        <div className="flex place-items-center space-x-5">
          {/* TOP ROW OF KNOBS!!! */}
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={10}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={chorus.rate}
              onChange={(e) =>
                setChorus({
                  rate: e.value,
                  delay: chorus.delay,
                  feedback: chorus.feedback,
                  bypass: chorus.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm ">RATE</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(chorus.delay * 100)}
              onChange={(e) =>
                setChorus({
                  rate: chorus.rate,
                  delay: e.value / 100,
                  feedback: chorus.feedback,
                  bypass: chorus.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm">DELAY</label>
          </div>
        </div>
        <div className="flex place-items-center space-x-5">
          {" "}
          {/* BOTTOM ROW OF KNOBS!!! */}
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(chorus.feedback * 100)}
              onChange={(e) =>
                setChorus({
                  rate: chorus.rate,
                  delay: chorus.delay,
                  feedback: e.value / 100,
                  bypass: chorus.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm">FEEDBACK</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(chorus.bypass * 100)}
              onChange={(e) =>
                setChorus({
                  rate: chorus.rate,
                  delay: chorus.delay,
                  feedback: chorus.feedback,
                  bypass: e.value / 100,
                })
              }
            />
            <label className="col-span-1 text-sm">BYPASS</label>
          </div>
          {/* <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(chorus.wet * 100)}
              onChange={(e) =>
                setChorus({
                  frequency: chorus.frequency,
                  delayTime: chorus.delayTime,
                  depth: chorus.depth,
                  feedback: chorus.feedback,
                  spread: chorus.spread,
                  wet: e.value / 100,
                })
              }
            /> */}
          {/* <label className="col-span-1 text-sm">WET</label>
          </div> */}
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
      <div className="grid col-span-2 bg-green-700 px-10 py-5 mt-5">
        <div>
          <h1>PHASER</h1>
        </div>
        <div className="flex space-x-5">
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
      <div className="grid bg-blue-500 py-5 px-5 mt-5 ml-6 justify-self-start">
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
              value={reverb.decay === 1 ? 0 : Math.round(reverb.decay * 100)}
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
      <div className="grid bg-red-700 px-5 py-5 mt-5 -ml-12">
        <div>
          <h1>TREMOLO</h1>
        </div>
        <div className="flex space-x-5">
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
