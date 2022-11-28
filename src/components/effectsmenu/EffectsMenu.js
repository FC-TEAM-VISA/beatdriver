import React, { useState } from "react";
import { Knob } from "primereact/knob";
// chorus, phaser, reverb, tremolo + mute effect button

function EffectsMenu({
  bitcrusher,
  chorus,
  phaser,
  tremolo,
  setBitcrusher,
  setPhaser,
  setChorus,
  setTremolo,
  moog,
  setMoog,
  wahWah,
  setWahWah,
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
              value={Math.round(chorus.delay * 1000)}
              onChange={(e) =>
                setChorus({
                  rate: chorus.rate,
                  delay: e.value / 1000,
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
                  feedback: chorus.feedback,
                  bypass: e.value / 100,
                })
              }
            />
            <label className="col-span-1 text-sm">FEEDBACK</label>
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
      <div className="grid col-span-2 bg-green-700 px-10 py-5 mt-5">
        <div>
          <h1>PHASER</h1>
        </div>
        <div className="flex space-x-5">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={8}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={phaser.rate}
              onChange={(e) =>
                setPhaser({
                  rate: e.value,
                  depth: phaser.depth,
                  feedback: phaser.feedback,
                  stereoPhase: phaser.stereoPhase,
                  baseModulationFrequency: phaser.baseModulationFrequency,
                  bypass: phaser.bypass,
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
              value={Math.round(phaser.depth * 100)}
              onChange={(e) =>
                setPhaser({
                  rate: phaser.rate,
                  depth: e.value / 100,
                  feedback: phaser.feedback,
                  stereoPhase: phaser.stereoPhase,
                  baseModulationFrequency: phaser.baseModulationFrequency,
                  bypass: phaser.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm">DEPTH</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(phaser.feedback * 100)}
              onChange={(e) =>
                setPhaser({
                  rate: phaser.rate,
                  depth: phaser.depth,
                  feedback: e.value / 100,
                  stereoPhase: phaser.stereoPhase,
                  baseModulationFrequency: phaser.baseModulationFrequency,
                  bypass: phaser.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm">FEEDBACK</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={180}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={phaser.stereoPhase}
              onChange={(e) =>
                setPhaser({
                  rate: phaser.rate,
                  depth: phaser.depth,
                  feedback: phaser.feedback,
                  stereoPhase: e.value,
                  baseModulationFrequency: phaser.baseModulationFrequency,
                  bypass: phaser.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm">STEREO PHASE</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={500}
              max={1500}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={phaser.baseModulationFrequency}
              onChange={(e) =>
                setPhaser({
                  rate: phaser.rate,
                  depth: phaser.depth,
                  feedback: phaser.feedback,
                  stereoPhase: phaser.stereoPhase,
                  baseModulationFrequency: e.value,
                  bypass: phaser.bypass,
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
      <div className="grid col-span-2 bg-blue-500 py-5 px-5 mt-5 ml-6 justify-self-start">
        <div>
          <h1>MOOG</h1>
        </div>
        <div className="flex">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(moog.cutoff * 1000)}
              onChange={(e) =>
                setMoog({
                  cutoff: e.value / 1000,
                  resonance: moog.resonance,
                  bufferSize: moog.bufferSize,
                })
              }
            />
            <label className="col-span-1 text-sm ">CUTOFF</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={400}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(moog.resonance * 100)}
              onChange={(e) =>
                setMoog({
                  cutoff: moog.cutoff,
                  resonance: e.value / 100,
                  bufferSize: moog.bufferSize,
                })
              }
            />
            <label className="col-span-1 text-sm ">resonance</label>
          </div>
          {/* <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={256}
              max={16384}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={bitcrusher.bufferSize}
              onChange={(e) =>
                setBitcrusher({
                  bits: bitcrusher.bits,
                  normfreq: bitcrusher.normfreq,
                  bufferSize: e.value,
                })
              }
            />
            <label className="col-span-1 text-sm ">BUFFER</label>
          </div> */}
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
      <div className="grid col-span-2 bg-red-700 px-5 py-5 mt-5 -ml-12">
        <div>
          <h1>TREMOLO</h1>
        </div>
        <div className="flex space-x-5">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(tremolo.intensity * 100)}
              onChange={(e) =>
                setTremolo({
                  intensity: e.value / 100,
                  rate: tremolo.rate,
                  stereoPhase: tremolo.stereoPhase,
                  bypass: tremolo.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm ">INTENSITY</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={8}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={tremolo.rate}
              onChange={(e) =>
                setTremolo({
                  intensity: tremolo.intensity,
                  rate: e.value,
                  stereoPhase: tremolo.stereoPhase,
                  bypass: tremolo.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm">RATE</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={180}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={tremolo.stereoPhase}
              onChange={(e) =>
                setTremolo({
                  intensity: tremolo.intensity,
                  rate: tremolo.rate,
                  stereoPhase: tremolo.stereoPhase,
                  bypass: tremolo.bypass,
                })
              }
            />
            <label className="col-span-1 text-sm">STEREO PHASE</label>
          </div>
        </div>
      </div>

      {/* WAHHHHHHH WAHHHHHHHHHHHHHH WAHHHHH */}

      <div className="grid col-span-2 bg-red-700 px-5 py-5 mt-5 -ml-12">
        <div>
          <h1>WAHWAH</h1>
        </div>
        <div className="flex space-x-5">
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(wahWah.baseFrequency * 100)}
              onChange={(e) =>
                setWahWah({
                  automode: wahWah.automode, //true/false
                  baseFrequency: e.value / 100, //0 to 1
                  excursionOctaves: wahWah.excursionOctaves, //1 to 6
                  sweep: wahWah.sweep, //0 to 1
                  resonance: wahWah.resonance, //1 to 100
                  sensitivity: wahWah.sensitivity, //-1 to 1
                  bypass: wahWah.bypass, //-1 to 100,
                })
              }
            />
            <label className="col-span-1 text-sm ">Base Frequency</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={1}
              max={6}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={wahWah.excursionOctaves}
              onChange={(e) =>
                setWahWah({
                  automode: wahWah.automode, //true/false
                  baseFrequency: wahWah.baseFrequency, //0 to 1
                  excursionOctaves: e.value, //1 to 6
                  sweep: wahWah.sweep, //0 to 1
                  resonance: wahWah.resonance, //1 to 100
                  sensitivity: wahWah.sensitivity, //-1 to 1
                  bypass: wahWah.bypass, //-1 to 100,
                })
              }
            />
            <label className="col-span-1 text-sm">EXCURSION OCTAVES</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={0}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(wahWah.sweep * 100)}
              onChange={(e) =>
                setWahWah({
                  automode: wahWah.automode, //true/false
                  baseFrequency: wahWah.baseFrequency, //0 to 1
                  excursionOctaves: wahWah.excursionOctaves, //1 to 6
                  sweep: e.value / 100, //0 to 1
                  resonance: wahWah.resonance, //1 to 100
                  sensitivity: wahWah.sensitivity, //-1 to 1
                  bypass: wahWah.bypass, //-1 to 100,
                })
              }
            />
            <label className="col-span-1 text-sm">SWEEP</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={1}
              max={100}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={wahWah.resonance}
              onChange={(e) =>
                setWahWah({
                  automode: wahWah.automode, //true/false
                  baseFrequency: wahWah.baseFrequency, //0 to 1
                  excursionOctaves: wahWah.excursionOctaves, //1 to 6
                  sweep: wahWah.sweep, //0 to 1
                  resonance: e.value, //1 to 100
                  sensitivity: wahWah.sensitivity, //-1 to 1
                  bypass: wahWah.bypass, //-1 to 100,
                })
              }
            />
            <label className="col-span-1 text-sm">RESONANCE</label>
          </div>
          <div className="field col-12 md:col-4 p-1 grid place-items-center">
            <Knob
              size={60}
              min={-1}
              max={1}
              valueColor={"MediumPurple"}
              rangeColor={"White"}
              textColor={"WHITE"}
              value={Math.round(wahWah.sensitivity * 100)}
              onChange={(e) =>
                setWahWah({
                  automode: wahWah.automode, //true/false
                  baseFrequency: wahWah.baseFrequency, //0 to 1
                  excursionOctaves: wahWah.excursionOctaves, //1 to 6
                  sweep: wahWah.sweep, //0 to 1
                  resonance: wahWah.resonance, //1 to 100
                  sensitivity: e.value / 100, //-1 to 1
                  bypass: wahWah.bypass, //-1 to 100,
                })
              }
            />
            <label className="col-span-1 text-sm">SENSITIVITY</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EffectsMenu;
