// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';
import { useEffect } from "react";


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

// import backgroundImage from './imageAssets/Zheng.jpg';
// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Zheng.
 ** ------------------------------------------------------------------------ */

interface ZhengKeyProps {
  note: string; // C, D, E, G, A
  duration?: string;
  synth?: Tone.Player; // Contains library code for making sound
  // synth?: Tone.Synth;
  index: number; // highest is 1, lowest is 21
  isG?: boolean;
}

interface BridgeProps{
  position:number;
}


export function ZhengString({
  note,
  synth,
  index, 
  isG

}: ZhengKeyProps): JSX.Element {
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
      
      onMouseOver={() => {
        synth?.load(note);
        synth?.start();
      }
    }
     
      className={classNames("zheng_string", {
        'G': isG, // G string is Green
        'others': !isG, // other strings are block
      })}
      style={{

        background: isG ? '#008000' : '#000000',
        width: '100%',
        height: ".3rem",
        // height: "auto",
        borderRadius: ".1rem",
        marginTop:'10px',
        marginBottom:'10px',
        position: 'relative',
        display: 'flex',

        alignItems: 'center',
        justifyContent: 'center'
  
      }}>
      <Bridge position={index}></Bridge>
      
    </div>
  );
}

export function Bridge({position}: BridgeProps):JSX.Element{
  // console.log('Rendering Bridge with position:', position.valueOf());
  return(
    <div 
    className = "node" 
    style = {{marginLeft:`${20-2*position.valueOf()}rem`,
              width: '1rem', 
              height: '1rem', 
              borderRadius: '50%',
              backgroundColor:'rgb(101, 67, 33)'}}>
    </div>
  )
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

  
  return (
    <div className="bg-bluish-black">
      <div className="Zheng">
         {keys.map(key=>{
            const isG = key.idx % 5 === 2;
            const newSynth = new Tone.Player(key.note).toDestination();
            return (

             <ZhengString
                  key={key.note} //react key
                  note={key.note}
                  synth={newSynth}
                  isG = {isG}
                  index={key.idx+1}
                />
           
              );
          })
        }
      
      </div>

    </div>
  );
}

export const ZhengInstrument = new Instrument('Ruxue_Zheng', Zheng);

