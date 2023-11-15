// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Zheng.
 ** ------------------------------------------------------------------------ */

interface ZhengKeyProps {
  note: string; // C, D, E, G, A
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Check if the pressed key is the one you want to trigger portamento
    if (synth && event.key === 'w') {
      // Trigger portamento or any other action you want
      synth.portamento = 1; // Example: set portamento time to 0.1 seconds

    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // Check if the released key is the one you want to stop the portamento
    if (synth && event.key === 'w') {
      // Stop portamento or perform any other cleanup
      synth.portamento = 0; // Example: set portamento time back to 0
      
    }
  };

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
      
      onMouseOver={() => synth?.triggerAttackRelease(`${note}`,'8n')} // Q
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
        left: `${leftLength + index +30}rem`,
        margin:"1rem",
        background: isG ? '#008000' : '#000000',
        width: `${70 - top}rem`,
        height: ".2rem",
        borderRadius: ".1rem"
      }}>
    </div>
  );
}



function Zheng({ synth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'C', idx: 0 },
    { note: 'D', idx: 1 },
    { note: 'E', idx: 2 },
    { note: 'G', idx: 3 },
    { note: 'A', idx: 4 },

  ]);

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(3, 7).map(octave =>
          keys.map(key => {
            const note = `${key.note}${octave}`;
            const isG = key.note.indexOf('G') === 0;
            return (
              <ZhengString
                key={note} //react key
                note={note}
                synth={synth}
                octave={octave}
                isG = {isG}
                index={octave * 5 + key.idx}
                top={((octave-3) * 5 + key.idx)}
                leftLength={0}
              />
            );
          }),
        )}
        <ZhengString
        key="C7" // React key for the bottom string
        note="C7" // Adjust the note for the bottom string
        synth={synth}
        octave={7} // Adjust the octave for the bottom string
        isG={false} // Adjust as needed
        index={7 * 5} // Adjust the index for the bottom string
        top={(7 - 3) * 5 } // Adjust the top position for the bottom string
        leftLength={0}
      />
      </div>

    </div>
  );
}

export const ZhengInstrument = new Instrument('Zheng', Zheng);

