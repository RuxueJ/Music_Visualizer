// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

import { defaultState } from '../State';


// project imports
import { Visualizer } from '../Visualizers';

// const POINTS = 0
// const LINES = 1
// const TRIANGLES = 4
// const TRIANGLE_STRIP = 5
// const TRIANGLE_FAN = 6
// const QUADS = 7
// const QUAD_STRIP = 8
 let inc = 0.01;
 let start =0;
 let zoff = 0;

export const QCVisualizer = new Visualizer(
  'Qin_FlowerForm',
  // (p5: P5, analyzer: Tone.Analyser) => {
    (p5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => {
    //const fft = new p5.FFT();
    const width = window.innerWidth/2.5;
    const height = window.innerHeight/4;
    //const dim = Math.min(width, height);  //thread
    //p5.pixelDensity(1);
    //p5.loadPixels();
    //console.log(width,height) //958 418
    p5.background(0, 0, 0, 255);  //background color    
    p5.translate(width,height)
    p5.angleMode(p5.DEGREES);
    //p5.strokeWeight(dim * 0.001);  //thread thin
    p5.stroke(255, 255, 255, 255);  //thread color
    p5.noFill();    //fill the color while the thread moves

    // const values = analyzer.getValue();
    const values = analyzers.waveform.getValue();
    //const fft = analyzers.fft.getValue();
    //console.log(fft)
    // console.log("is this fft?: ",fft)
    p5.beginShape();  //reset thread
    
    let yoff = 0;
    let coff = 0;
    //console.log("values: ",values,"values.length: ",values.length)
    for (let i = 0; i < values.length; i++) {
    //for (let x = 0; x < width; x++) {
      //const amplitude = values[x] as number;  
      //let xoff = amplitude;
      // for (let y =0; y < height; y++){
      
      //   // let index = (x + y* width) *4
      //   // let r = p5.noise(xoff, yoff)*255;
      //   // p5.pixels[index+0] = r;
      //   // p5.pixels[index+1] = r;
      //   // p5.pixels[index+2] = r;
      //   // p5.pixels[index+3] = 255;
      //   // xoff += inc;
      // }
      // yoff += inc;
      //move without any trigger:
      // // const y = p5.random(height);
      // const y = height/2+ Math.sin(xoff)*height/2;
      // p5.vertex(i, y);
      // xoff += inc;
      
        // If the mouse just entered the pattern, record the start time
      // let isMouseDown = defaultState.get('mouse_down');
      
      // if(isMouseDown){
      //   console.log("isMouseDown")
      //   p5.fill(0+coff);
      //   coff += 1;
      // }
      
      const amplitude = values[i] as number;
      const sampleRate = 44100 - amplitude;
      //for (let j = 0; j < fft.length; j++) {
        //const frequency = fft[i] as number;
        //console.log(frequency)
        //const colorValue = p5.map(frequency,0,225,0,255)
          //p5.fill(colorValue, 0, 255-colorValue);
          // const x = p5.map(i, 0, values.length - 1, 0, width);
          // const y = height / 2 + amplitude * height;
          const r = p5.map(amplitude, -1, 1, 0, 100+i);
          const angle = p5.map(i, 0, values.length - 1, 0, 360*2.5);
          const x = r*Math.cos(angle);
          const y = r*Math.sin(angle);
          p5.vertex(x,y);
      //}
        //p5.ellipse(width,height,amplitude*900,amplitude*900)
    }
    //p5.updatePixels();
    p5.endShape();
    start += inc;
  },
);