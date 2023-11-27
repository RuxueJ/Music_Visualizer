// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const Kao_vis = new Visualizer(
  'kao_visual',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight/2;
    const depth = 20;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    // p5.strokeWeight(dim*0.01); //dim* 0.01

    const rgb1 = Math.floor(Math.random() * 265);
    const rgb2 = Math.floor(Math.random() * 265);
    const rgb3 = Math.floor(Math.random() * 265);
    p5.fill(rgb1, rgb2, rgb3);
    p5.noStroke();
    // p5.stroke(rgb1, rgb2, rgb3);
    // p5.stroke(255, 255, 255, 255);
    // p5.noFill();

    const values = analyzer.getValue();
    console.log(values);

    // // // Set perspective for a 3D view
    // p5.perspective();
    // p5.translate(width / 2, height / 2, depth / 2); // Move to the center of the canvas

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;

      //bot
      // const x = p5.map(i, 0, values.length - 1, width / 2, width / 2);
      // const y = amplitude * height;
      // const z = p5.map(i, 0, values.length - 1, depth / 2, depth / 2);



      const x = p5.map(i, 100, values.length - 1, 0, p5.width/amplitude);
      const y = (p5.height/2);
      const radius = p5.map(amplitude, -1, 2, 0, 100);
      // const y = height / 2 + amplitude * height;

      // Place vertex
      // p5.vertex(x, y);

      //p5.vertex(x, y, z);

      //p5.ellipse(x,y,radius*2, radius*2);

      const animatedRadius = radius + p5.sin(p5.frameCount * 0.05) * 100;
      p5.ellipse(x, y, animatedRadius * 2, animatedRadius * 2);
    }
    p5.endShape();
  },
);

