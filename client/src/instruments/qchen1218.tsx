// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import { relative } from 'path';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */

interface DrumProps {
  note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  tom?: boolean; // True if tom, false if cymbal
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function Drums({
  note,
  synth,
  tom,
  index,
}: DrumProps): JSX.Element {
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
      onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      className={classNames('ba pointer absolute dim', {
        'bg-gold black h5': tom, // minor keys are black
        'black bg-white h5': !tom, // major keys are white
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 10}rem`,
        zIndex: 1,
        width:  '9rem',
        height:  '9rem',
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

function Piano({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
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
    'sine',
    'sawtooth',
    'square',
    'triangle',
    'fmsine',
    'fmsawtooth',
    'fmtriangle',
    'amsine',
    'amsawtooth',
    'amtriangle',
  ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        <Drums    
            //Bass Drum C1/C2
            //Snare Drum D2/E2
            //Hi-Hat closeF2 openG2
            //Tom-Toms A2/B2/C3
            //Crash Cymbal C4/D4
            //Ride Cymbal E4/F4
                key={"C1"} //react key
                note={"C1"}
                synth={synth}
                tom={true}
                octave={2}
                index={0}
              />
         <Drums    
            
            key={"C2"} //react key
            note={"C2"}
            synth={synth}
            tom={false}
            octave={2}
            index={2}
          />

        <Drums    
            
            key={"C2"} //react key
            note={"C2"}
            synth={synth}
            tom={false}
            octave={2}
            index={1}
          />

        {/* {Range(2, 3).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            console.log("note is: ",note);
            console.log("octave is: ",octave);
            return (
              <Drums
                key={note} //react key
                note={note}
                synth={synth}
                tom={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
              
            );
          }),
        )} */}
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

export const QCInstrument = new Instrument('QCI', Piano);
