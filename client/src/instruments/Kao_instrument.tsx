// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

import A_note from './accsetSounds/Guitar/electric_guitar_A_.wav';
import B_note from './accsetSounds/Guitar/electric_guitar_B_.wav';
import D_note from './accsetSounds/Guitar/electric_guitar_D_.wav';
import E_note from './accsetSounds/Guitar/electric_guitar_E_.wav';
import High_E_note from './accsetSounds/Guitar/electric_guitar_High_E_ .wav';
import G_note from './accsetSounds/Guitar/guitar_single_G_.wav';

import backgroundImage from './imageAssets/guitarBody.jpg';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';


/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface GuitarProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B || Guitar notes low to high: E,A,D,G,B,E
    duration?: string;
    synth?: Tone.Player; // Tone.Synth
    minor?: boolean; // True if minor key, false if major key
    //octave: number;
    index: number; // octave + index together give a location for the piano key
    
    string_height: number;
    //stagger: number;
  }
  



  
  export function Guitar({
    note,
    synth,
    minor,
    index,

    string_height,
    //stagger,
  }: GuitarProps): JSX.Element {
    return (
      // Observations:
      // 1. The JSX refers to the HTML-looking syntax within TypeScript.
      // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
      // 3. The curly braces `{` and `}` should remind you of string interpolation.
      <div
        onMouseDown={async () => {
          await synth?.load(note);
          synth?.start();
        }}
        // Question: what is `onMouseDown`?
        onMouseUp={() => synth?.stop('+1.25')} // Question: what is `onMouseUp`?
        className={classNames('ba pointer absolute dim', {
          'bg-black black h5': minor, // minor keys are black
          'black bg-silver h5': !minor, // major strings are silver
        })}
        style={{
          // CSS
          top: `${2.5+index-(string_height/10)}rem`, //0,
          left:170,//`${index * 0}rem`, //modified
          zIndex: 1,
          height: string_height,
          width: '55.5rem',
          marginLeft: '0.00rem',
          borderBottom: '3px solid #000',
          
        }}
      ></div>
    );
  }
  
  function GuitarType({ title, onClick, active }: any): JSX.Element {
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
  
  function Electric_Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
        { note : E_note, idx: 0 },
        { note : A_note, idx: 1 },
        { note : D_note, idx: 2 },
        { note : G_note, idx: 3 },
        { note : B_note, idx: 4 },
        { note : High_E_note, idx: 5 },
    ]);
  
    const setOscillator = (newType: Tone.ToneOscillatorType) => {
      setSynth(oldSynth => {
        oldSynth.disconnect();
  
        return new Tone.Synth({
          oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        }).toDestination();
      });
    };
  
    // const oscillators: List<OscillatorType> = List([
    //   'sawtooth',
    // ]) as List<OscillatorType>;
  
    return (
      <div className="pv4" style={{ backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "250px 200px",
      backgroundRepeat: 'no-repeat',
      backgroundPosition: "0px 0px"
      }}>
        <div className="relative dib h4 w-100 ml4">
          {keys.map(key=>{
            const newSynth = new Tone.Player(key.note).toDestination();
            return(
              <Guitar
                note={key.note}
                synth={newSynth}
                index={key.idx}
                string_height={9-key.idx}
              />
            )
          })}
          {/* {Range(2, 7).map(octave =>
            keys.map(key => {
              const isMinor = key.note.indexOf('b') !== -1;
              const note = `${key.note}${octave}`;
              return ( */}
                {/* <Guitar
                  // key={note} //react key
                  note={'E1'}
                  synth={synth}
                  // minor={isMinor}
                 // octave={1}
                  index={0} //controls distance between key groups

                  string_height={9}
                />

                <Guitar
                  note={'A2'}
                  synth={synth}
                  //octave={1}
                  index={1}
                  string_height={8}
                />

                <Guitar
                  note={'D3'}
                  synth={synth}
                  //octave={1}
                  index={2}
                  string_height={7}
                />

                <Guitar
                  note={'G3'}
                  synth={synth}
                  //octave={1}
                  index={3}
                  string_height={6}
                />

                <Guitar
                  note={'B3'}
                  synth={synth}
                  //octave={1}
                  index={4}
                  string_height={4}
                />

                <Guitar
                  note={'E4'}
                  synth={synth}
                  //octave={2}
                  index={5}
                  string_height={0.1}
                />
              {/* );
            }),
          )} */}
        </div>
        {/* <div className={'pl4 pt4 flex'}>
          {oscillators.map(o => (
            <GuitarType
              key={o}
              title={o}
              onClick={() => setOscillator(o)}
              active={synth?.oscillator.type === o}
            />
          ))}
        </div> */}
      </div>
    );
  }
  
  export const Kao_Guitar = new Instrument('Kao_Guitar', Electric_Guitar);
  
