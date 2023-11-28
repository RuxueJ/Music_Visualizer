// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';


import string_1 from './accsetSounds/Zheng/string_1.wav';
import string_2 from './accsetSounds/Zheng/string_2.wav';
import string_3 from './accsetSounds/Zheng/string_3.wav';
import string_4 from './accsetSounds/Zheng/string_4.wav';
import string_5 from './accsetSounds/Zheng/string_5.wav';
import string_6 from './accsetSounds/Zheng/string_6.wav';
import string_7 from './accsetSounds/Zheng/string_7.wav';
import string_8 from './accsetSounds/Zheng/string_8.wav';
import string_9 from './accsetSounds/Zheng/string_9.wav';
import string_10 from './accsetSounds/Zheng/string_10.wav';
import string_11 from './accsetSounds/Zheng/string_11.wav';
import string_12 from './accsetSounds/Zheng/string_12.wav';
import string_13 from './accsetSounds/Zheng/string_13.wav';
import string_14 from './accsetSounds/Zheng/string_14.wav';
import string_15 from './accsetSounds/Zheng/string_15.wav';
import string_16 from './accsetSounds/Zheng/string_16.wav';
import string_17 from './accsetSounds/Zheng/string_17.wav';
import string_18 from './accsetSounds/Zheng/string_18.wav';
import string_19 from './accsetSounds/Zheng/string_19.wav';
import string_20 from './accsetSounds/Zheng/string_20.wav';
import string_21 from './accsetSounds/Zheng/string_21.wav';

import backgroundImage from './imageAssets/Zheng.jpg';
// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Zheng.
 ** ------------------------------------------------------------------------ */

interface ZhengKeyProps {
  note: string; // C, D, E, G, A
  duration?: string;
  synth?: Tone.Player; // Contains library code for making sound
  index: number; // octave + index together give a location for the piano key
  isG?: boolean;
  leftLength: number;
  top: number;
}



export function ZhengString({
  note,
  synth,
  index, // from top to bottom
  isG,
  leftLength,
  top

}: ZhengKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the piano.
   * See `PianoKeyWithoutJSX` for the React component without JSX.
   */

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   // Check if the pressed key is the one you want to trigger portamento
  //   if (synth && event.key === 'w') {
  //     // Trigger portamento or any other action you want
  //     synth.portamento = 1; // Example: set portamento time to 0.1 seconds

  //   }
  // };

  // const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
  //   // Check if the released key is the one you want to stop the portamento
  //   if (synth && event.key === 'w') {
  //     // Stop portamento or perform any other cleanup
  //     synth.portamento = 0; // Example: set portamento time back to 0
      
  //   }
  // };

  // const glideBetweenTones = (toneA, interval) => {
  //   synth?.triggerAttackRelease(toneA, '4n'); // Trigger the attack of tone A

  //   // Calculate the transposition based on the interval
  //   const transposition = interval === 'half' ? 1 : 2; // Adjust the interval as needed

  //   // Set the transpose property to glide up by the specified interval
  //   if(synth){
  //     synth.transpose = transposition;

  //   // Trigger the attack of the transposed tone
  //   synth.triggerAttack(`${toneA}+${transposition}`);
  // };

  return (
    // Observations:
    // 1. The JSX refers to the HTML-looking syntax within TypeScript.
    // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
    // 3. The curly braces `{` and `}` should remind you of string interpolation.
    <div

      // onMouseOver={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
     
      // onMouseLeave={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
      
      onMouseOver={() => {
        synth?.load(note);
        synth?.start();
      }
    }
      // onMouseOver={() => {
      //   if(synth){
      //     synth.portamento = 0.1; // Adjust the portamento time as needed (in seconds)
      //   }

      //   // Trigger the glide from C3 to C4
      //   synth?.triggerAttackRelease('C3', '8n'); // Attack 'C3' and release after a half note
      //   synth?.triggerAttackRelease('C4', '8n', '8n');
      // }
      
      // onMouseOver={() => {
      //   synth?.triggerAttackRelease(`${note}`,'8n');
      //   if(synth){
      //     synth.portamento = 1;}

      //   synth?.triggerAttackRelease(`${note}+1`,'8n');
        
      // }
      // }
      className={classNames('ba pointer absolute dim', {
        'G': isG, // G string is Green
        'others': !isG, // other strings are block
      })}
      style={{
        top: `${top}rem`,
        left: `${index + 10}rem`,
        margin:"1rem",
        background: isG ? '#008000' : '#000000',
        width: `${30 - top}rem`,
        height: ".2rem",
        borderRadius: ".1rem"
      }}>
    </div>
  );
}



function Zheng({ synth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: string_1, idx: 0 },
    { note: string_2, idx: 1 },
    { note: string_3, idx: 2 },
    { note: string_4, idx: 3 },
    { note: string_5, idx: 4 },
    { note: string_6, idx: 5 },
    { note: string_7, idx: 6 },
    { note: string_8, idx: 7 },
    { note: string_9, idx: 8 },
    { note: string_10, idx: 9 },
    { note: string_11, idx: 10 },
    { note: string_12, idx: 11},
    { note: string_13, idx: 12},
    { note: string_14, idx: 13},
    { note: string_15, idx: 14 },
    { note: string_16, idx: 15 },
    { note: string_17, idx: 16 },
    { note: string_18, idx: 17 },
    { note: string_19, idx: 18},
    { note: string_20, idx: 19},
    { note: string_21, idx: 20},

  ]);

  
  // Tone.loaded().then(() => {
  //   // sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 0.5);
  //   // sampler.triggerAttackRelease(["C4"], 0.5);
  //   sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 0.5);

  //   // Wait for 0.5 seconds (500 milliseconds)
  //   setTimeout(() => {
  //     sampler.triggerAttackRelease(["C4"], 0.5);
  //   }, 500);
  // })

  return (
    <div className="pv4" style={{ backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center center"
    }}>
      <div className="relative dib h4 w-100 ml4">
  
         {keys.map(key=>{
            const isG = key.idx % 5 === 2;
            const newSynth = new Tone.Player(key.note).toDestination();
            return (
              <ZhengString
                key={key.note} //react key
                note={key.note}
                synth={newSynth}
                isG = {isG}
                index={((22 - key.idx)) *0.8}
                top={((22 - key.idx)) *0.8}
                leftLength={0}
              />
            );
          })
        }
      
      </div>

    </div>
  );
}

export const ZhengInstrument = new Instrument('Ruxue_Zheng', Zheng);

