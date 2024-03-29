// 3rd party library imports
import * as Tone from 'tone';
import Sketch from 'react-p5';
import P5 from 'p5';
import React, { useEffect, useMemo, useCallback } from 'react';

// type VisualizerDrawer = (p5: P5, analyzer: Tone.Analyser) => void;
type VisualizerDrawer = (p5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => void;

interface VisualizerContainerProps {
  visualizer: Visualizer;
}

export class Visualizer {
  public readonly name: string;
  public readonly draw: VisualizerDrawer;

  constructor(name: string, draw: VisualizerDrawer) {
    this.name = name;
    this.draw = draw;
  }
}

export function VisualizerContainer({ visualizer }: VisualizerContainerProps) {
  const { name, draw } = visualizer;
  const backgroundImage = require('./img/visualizer_bg.jpg'); 
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser} = useMemo(
    () => {
      return {
        waveform:new Tone.Analyser("waveform", 256),
        fft: new Tone.Analyser("fft",1024),
      };
    },[]
    // const analyzer: Tone.Analyser = useMemo(
    //   // () => new Tone.Analyser("fft", 2048),
    //   () => new Tone.Analyser("waveform", 256),
    //   [],
  );


  const onResize = useCallback((p5: P5) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    p5.resizeCanvas(width, height, false);
  }, []);

  useEffect(() => {
    Tone.getDestination().volume.value = -5;
    Tone.getDestination().connect(analyzers.waveform);
    Tone.getDestination().connect(analyzers.fft);
    return () => {
      Tone.getDestination().disconnect(analyzers.waveform);
      Tone.getDestination().disconnect(analyzers.fft);
    };
  }, [analyzers]);

  // useEffect(() => {
  //   Tone.getDestination().connect(analyzer);
  //   return () => {
  //     Tone.getDestination().disconnect(analyzer);
  //   };
  // }, [analyzer]);

  const setup = (p5: P5, canvasParentRef: Element) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    p5.createCanvas(width, height).parent(canvasParentRef);
  };

  return (
    <div className={'bg-black absolute bottom-0 right-0 left-0 h-50'} style={backgroundStyle}>
      <div className={'z-1 absolute left-0 top-0 pa4 white f5'}>{name}</div>
      <Sketch
        setup={setup}
        draw={p5 => draw(p5, analyzers)}
        windowResized={onResize}
      />
    </div>
  );
}