// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';


/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface GuitarProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B || Guitar notes low to high: E,A,D,G,B,E
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
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
    /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `PianoKeyWithoutJSX` for the React component without JSX.
     */
    return (
      // Observations:
      // 1. The JSX refers to the HTML-looking syntax within TypeScript.
      // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
      // 3. The curly braces `{` and `}` should remind you of string interpolation.
      <div
        onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
        onMouseUp={() => synth?.triggerRelease('+1.25')} // Question: what is `onMouseUp`?
        className={classNames('ba pointer absolute dim', {
          'bg-black black h5': minor, // minor keys are black
          'black bg-silver h5': !minor, // major keys are white
        })}
        style={{



          
          // CSS
          top: `${2.5+index-(string_height/10)}rem`, //0,
          left: 0,//`${index * 0}rem`, //modified
          zIndex: 1,
          height: string_height,
          width: '55.5rem',
          marginLeft: '0.00rem',
          borderBottom: '3px solid #000',
          
        }}
      ></div>
    );
  }
  
  // // eslint-disable-next-line
  // function PianoKeyWithoutJSX({
  //   note,
  //   synth,
  //   //minor,
  //   index,
  // }: GuitarProps): JSX.Element {
  //   /**
  //    * This React component for pedagogical purposes.
  //    * See `PianoKey` for the React component with JSX (JavaScript XML).
  //    */
  //   return React.createElement(
  //     'div',
  //     {
  //       onMouseDown: () => synth?.triggerAttack(`${note}`),
  //       onMouseUp: () => synth?.triggerRelease('+0.02'),
  //       className: classNames('ba pointer absolute dim', {
  //         // 'bg-black black h3': minor,
  //         // 'black bg-white h4': !minor,
  //       }),
  //       style: {
  //         top: 0,
  //         left: `${index * 2}rem`,
  //         zIndex: 0,
  //         width: '2rem',
  //         marginLeft: '0.25rem',
  //       },
  //     },
  //     [],
  //   );
  // }
  
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
        { note : 'B', idx: 6 }, //B
        { note : 'A', idx: 5 }, //E
        { note : 'G', idx: 4 }, //A
        { note : 'F', idx: 3 }, //D
        { note : 'E', idx: 2 }, //G
        { note : 'D', idx: 1 }, //B
        { note : 'C', idx: 0 }, //E
        
      //Piano
      // { note: 'C', idx: 0 }, 
      // { note: 'Db', idx: 0.5 },
      // { note: 'D', idx: 1 },
      // { note: 'Eb', idx: 1.5 },
      // { note: 'E', idx: 2 },
      // { note: 'F', idx: 3 },
      // { note: 'Gb', idx: 3.5 },
      // { note: 'G', idx: 4 },
      // { note: 'Ab', idx: 4.5 },
      // { note: 'A', idx: 5 },
      // { note: 'Bb', idx: 5.5 },
      // { note: 'B', idx: 6 },
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
      'fmsine1',
      // 'amsawtooth6',
      'custom',
      // 'sawtooth',
      // 'square',
      // 'triangle',
      // 'fatsine5',
      // 'fmsawtooth',
      // 'fmtriangle',
      // 'fmsquare',
      // 'amsine',
      // 'amsawtooth',
      // 'amtriangle',
      // 'fatsawtooth',
      // 'fattriangle',
      // 'pulse',
      // 'pwm',
    ]) as List<OscillatorType>;
  
    return (
      <div className="pv4">
        <div className="relative dib h4 w-100 ml4">
          {/* {Range(2, 7).map(octave =>
            keys.map(key => {
              const isMinor = key.note.indexOf('b') !== -1;
              const note = `${key.note}${octave}`;
              return ( */}
                <Guitar
                  // key={note} //react key
                  note={'E2'}
                  synth={synth}
                  // minor={isMinor}
                  octave={1}
                  index={0} //controls distance between key groups

                  string_height={9}
                />

                <Guitar
                  note={'A2'}
                  synth={synth}
                  octave={1}
                  index={1}
                  string_height={8}
                />

                <Guitar
                  note={'D3'}
                  synth={synth}
                  octave={1}
                  index={2}
                  string_height={7}
                />

                <Guitar
                  note={'G3'}
                  synth={synth}
                  octave={1}
                  index={3}
                  string_height={6}
                />

                <Guitar
                  note={'B3'}
                  synth={synth}
                  octave={1}
                  index={4}
                  string_height={4}
                />

                <Guitar
                  note={'E4'}
                  synth={synth}
                  octave={2}
                  index={5}
                  string_height={0.1}
                />
              {/* );
            }),
          )} */}
        </div>
        <div className={'pl4 pt4 flex'}>
          {oscillators.map(o => (
            <GuitarType
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
  
  export const Kao_Guitar = new Instrument('Kao Electric Guitar', Electric_Guitar);
  
