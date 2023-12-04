// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

import openhat from './accsetSounds/Drum/openhat_808.wav';
import crash_cymbal from './accsetSounds/Drum/crash_cymbal.wav';
import snare_drum from './accsetSounds/Drum/snare_drum.wav';
import high_tom from './accsetSounds/Drum/high_tom.wav';
import bass_drum from './accsetSounds/Drum/bass_drum.wav';
import mid_tom from './accsetSounds/Drum/mid_tom.wav';
import ride_cymbal from './accsetSounds/Drum/ride_cymbal.wav';
import low_tom from './accsetSounds/Drum/low_tom.wav';

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
  top: number;
  left: number; 
  radius: number; 
  borderRadius: number;
}

export function Drums({
  audioUrl,
  synth,
  drum,
  top,
  left,
  radius,
  borderRadius
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
        top: `${top}rem`,
        left: `${left}rem`,
        width: `${radius}rem`,
        height: `${radius}rem`,
        borderRadius: `${borderRadius}%`,
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
    { drum: false, audioUrl: openhat, radius: 5, left: 2, top: 4, borderRadius: 50  }, //hiHat
    { drum: false, audioUrl: crash_cymbal, radius: 6, left: 4, top: -1, borderRadius: 50  }, //crash cymabl
    { drum: true, audioUrl: snare_drum, radius: 6, left: 7, top: 5, borderRadius: 50  }, //snare Drum
    { drum: true, audioUrl: high_tom, radius: 4.5, left: 8.5, top: 1, borderRadius: 50  }, //high tom
    { drum: true, audioUrl: bass_drum, radius: 11, left: 16, top: 0, borderRadius: 50  }, //bass drum
    { drum: true, audioUrl: mid_tom, radius: 6, left: 29, top: 1, borderRadius: 50  }, //mid tom
    { drum: false, audioUrl: ride_cymbal, radius: 8, left: 35, top: -1, borderRadius: 50  }, //ride cymbal
    { drum: true, audioUrl: low_tom, radius: 7, left: 32, top:6, borderRadius: 50  }, //low tom
    //  { drum: false, idx: 1, audioUrl: hihat},
    //  { drum: true, idx: 2, audioUrl: kick},
    //  { drum: false, idx: 3, audioUrl: perc},
    //  { drum: false, idx: 4, audioUrl: snare},
    //  { drum: true, idx: 5, audioUrl: tom},
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
              radius={key.radius} 
              borderRadius={key.borderRadius}        
              left={key.left} 
              top={key.top}      
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
