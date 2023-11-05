// 3rd party library imports
import React from 'react';
import * as Tone from 'tone';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface CelloKeyProps {
  // Define CelloKeyProps interface properties here
}

function CelloKey({
  // Define CelloKey component properties and behavior
}: CelloKeyProps): JSX.Element {
  // Implement the CelloKey component JSX and functionality here
  return <div>{/* CelloKey JSX goes here */}</div>;
}

function CelloType({
  // Define CelloType component properties and behavior
}: any): JSX.Element {
  // Implement the CelloType component JSX and functionality here
  return <div>{/* CelloType JSX goes here */}</div>;
}

function Cello({ synth, setSynth }: InstrumentProps): JSX.Element {
  // Implement the Cello component JSX and functionality here
  return (
    <div>
      {/* Cello component JSX goes here */}
    </div>
  );
}

export const CelloInstrument = new Instrument('Cello', Cello);
