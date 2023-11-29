// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

import { defaultState } from '../State';

import { Visualizer } from '../Visualizers';

export const QCVisualizer = new Visualizer(
  'Qin_FlowerForm',
    (p5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => {
      const width = window.innerWidth/2.5;
      const height = window.innerHeight/4;
  
      p5.background(0, 0, 0, 255);  //background color    
      p5.translate(width,height)
      p5.angleMode(p5.DEGREES);
      p5.stroke(255, 255, 255, 255);  //thread color
      p5.noFill();    //fill the color while the thread moves
  
      const values = analyzers.waveform.getValue();
  
      p5.beginShape();  //reset thread
      
      for (let i = 0; i < values.length; i++) {
        
        const amplitude = values[i] as number;
        const r = p5.map(amplitude, -1, 1, 0, 100+i);
  
        const rgb1 = p5.map(Math.cos(r), -1, 1, 0, 255);
        const rgb2 = p5.map(Math.sin(r), -1, 1, 0, 255);
        const rgb3 = p5.map(r,  0, 100+i, 0, 255);
  
        p5.fill(rgb1, rgb2, rgb3); 
  
        const angle = p5.map(i, 0, values.length - 1, 0, 360*2.5);
        const x = r*Math.cos(angle);
        const y = r*Math.sin(angle);
        p5.vertex(x,y);
  
      }
      p5.endShape();

  },
);