// 3rd party library imports
import P5 from 'p5';
// import 'p5/lib/addons/p5.sound';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const JinVisualizer = new Visualizer(
  'Ruxue_FireworksForm',
  // (p5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => {
    (p5: P5, analyzer: Tone.Analyser) => {

    const width = window.innerWidth;
    const height = window.innerHeight / 2;
  


    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    const values = analyzer.getValue();
    // const values = analyzers.fft.getValue();
    // console.log("fft:" + values);

    let angle = 0;
    let spacing = 10;
    const rgb1 = Math.floor(Math.random() * 265);
    const rgb2 = Math.floor(Math.random() * 265);
    const rgb3 = Math.floor(Math.random() * 265);
    p5.fill(rgb1, rgb2, rgb3);
    p5.stroke(rgb1, rgb2, rgb3);
    // p5.stroke(255);

    p5.beginShape();

    // const barWidth = width / values.length;
    // const barWidth = width / 240;

   //fft
    // for (let i = 0; i < 240; i++) {
    //   const amplitude = values[i] as number;
   
    //   const barHeight = p5.map(amplitude, -100, 0, height, 0); // Adjust mapping based on your needs
    //   p5.rect(i * barWidth, 0, barWidth - 1, barHeight);
      
    // }

    // for (let i = 0; i < 240; i++) {
    //   const amplitude = values[i] as number;
    //   const angle = p5.map(i,0,values.length,0,360);
   
    //   const barHeight = p5.map(amplitude, -100, 0, height, 0); // Adjust mapping based on your needs

    //   const x = barHeight * Math.cos(angle)*0.5;
    //   const y =  barHeight * Math.sin(angle)*0.5;
    //   p5.stroke(34,56,56);
    //   p5.line(width/2 ,height/2, x,y);
      
    // }




    //waveform 
    for (let i = 0; i < values.length; i++) {

      const amplitude = values[i] as number;
      const lineLength = p5.map(amplitude, 0, 1, 2, 100);

      const radius = p5.map(Math.abs(amplitude), 0, 1, 0, width * 0.5);

      const x1 = width / 2 + radius * Math.cos(angle);
      const y1 = height / 2 + radius * Math.sin(angle);
      const x2 = x1 +  lineLength * Math.cos(angle); // Calculate endpoint based on line length
      const y2 = y1 + lineLength * Math.sin(angle); // Calculate endpoint based on line length

      p5.line(x1, y1, x2, y2); // Draw line from (x1, y1) to (x2, y2)

      angle += 2 * p5.TWO_PI / values.length * spacing;

    }

    p5.endShape();
  }

);

