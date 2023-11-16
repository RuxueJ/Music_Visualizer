// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// const POINTS = 0
// const LINES = 1
// const TRIANGLES = 4
// const TRIANGLE_STRIP = 5
// const TRIANGLE_FAN = 6
// const QUADS = 7
// const QUAD_STRIP = 8


export const QCVisualizer = new Visualizer(
  'QCform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth/2.5;
    const height = window.innerHeight /4;
    const dim = Math.min(width, height);  //thread
    

    //console.log(width,height) //958 418
    p5.background(0, 0, 0, 255);  //background color
    //p5.createCanvas(window.innerWidth,window.innerHeight)
    p5.translate(width,height)
    p5.angleMode(p5.DEGREES);
    p5.strokeWeight(dim * 0.001);  //thread thin
    p5.stroke(255, 255, 255, 255);  //thread color
    p5.noFill();    //fill the color while the thread moves
    //p5.fill(237, 34, 93);
    //p5.noStroke();

    const values = analyzer.getValue();
    p5.beginShape(1);  //reset thread

    //console.log("values: ",values,"values.length: ",values.length)
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      // const x = p5.map(i, 0, values.length - 1, 0, width);
      // const y = height / 2 + amplitude * height;
      const r = p5.map(amplitude, -1, 1, 0, 100+i);
      const angle = p5.map(i, 0, values.length - 1, 0, 360*2);
      const x = r*Math.cos(angle);
      const y = r*Math.sin(angle);
      p5.vertex(x,y);
      //p5.ellipse(width,height,amplitude*900,amplitude*900)
    }
    
    p5.endShape();
  },
);