// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

import clap from './accsetSounds/Drum/clap_808.wav';
import hihat from './accsetSounds/Drum/hihat_808.wav';
import kick from './accsetSounds/Drum/kick_808.wav';
import openhat from './accsetSounds/Drum/openhat_808.wav';
import perc from './accsetSounds/Drum/perc_808.wav';
import snare from './accsetSounds/Drum/snare_808.wav';
import tom from './accsetSounds/Drum/tom_808.wav';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
// import { relative } from 'path';
// import { DispatchAction } from '../Reducer';

// import { useState, useEffect } from 'react';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface DrumProps {
  audioUrl: string;
  synth?: Tone.Player;
  drum?: boolean; 
  index: number; 
}

export function Drums({
  audioUrl,
  synth,
  drum,
  index,
}: DrumProps): JSX.Element {
  const handleMouseDown = async () => {
    console.log("loading audio...")
    // Ensure the player is loaded before starting
    await synth?.load(audioUrl);
    synth?.start();
    console.log("loading audio done.")
  };

  const handleMouseUp = () => {
    // Stop the player on mouse up
    synth?.stop('+0.25');
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={classNames('ba pointer absolute dim', {
        'bg-gold black h5': !drum,
        'black bg-white h5': drum,
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 10}rem`,
        zIndex: 1,
        width: '9rem',
        height: '9rem',
        marginLeft: '2rem',
        borderRadius: '50%',
      }}
    ></div>
  );
}


function DrumType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
        'b--black black': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}


function DrumKits({ synth, setSynth }: InstrumentProps): JSX.Element {
  
  const keys = List([
    { drum: false, idx: 0, audioUrl: clap},
     { drum: false, idx: 1, audioUrl: hihat},
     { drum: true, idx: 2, audioUrl: kick},
     { drum: false, idx: 3, audioUrl: perc},
     { drum: false, idx: 4, audioUrl: snare},
     { drum: true, idx: 5, audioUrl: tom},
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'drum',
  ]) as unknown as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {keys.map(key=>{
          const newSynth = new Tone.Player(key.audioUrl).toDestination();
          return(
            <Drums 
              key={key.audioUrl}
              audioUrl={key.audioUrl} 
              synth={newSynth}
              drum ={key.drum}
              index={key.idx}              
            /> 
          )
        })}
         

      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <DrumType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const QCInstrument = new Instrument('Qin_Drum', DrumKits);
