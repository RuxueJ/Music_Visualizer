// 3rd party library imports
import P5 from 'p5';
// import 'P5/lib/addons/P5.sound';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const Ruxue_FireworksForm = new Visualizer(
  'Ruxue_FireworksForm',
  (P5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => {
    // (P5: P5, analyzer: Tone.Analyser) => {

    const width = window.innerWidth;
    const height = window.innerHeight / 2;
  
    const dim = Math.min(width, height);

    P5.background(0, 0, 0, 255);

    P5.strokeWeight(dim * 0.01);

    const values = analyzers.waveform.getValue();
   

    let angle = 0;
    let spacing = 10;
    const rgb1 = Math.floor(Math.random() * 265);
    const rgb2 = Math.floor(Math.random() * 265);
    const rgb3 = Math.floor(Math.random() * 265);
    P5.fill(rgb1, rgb2, rgb3);
    P5.stroke(rgb1, rgb2, rgb3);


    P5.beginShape();

    //waveform 
    for (let i = 0; i < values.length; i++) {

      const amplitude = values[i] as number;
      const lineLength = P5.map(amplitude, 0, 1, 2, 100);

      const radius = P5.map(Math.abs(amplitude), 0, 1, 0, width * 0.5);

      const x1 = width / 2 + radius * Math.cos(angle);
      const y1 = height / 2 + radius * Math.sin(angle);
      const x2 = x1 +  lineLength * Math.cos(angle); // Calculate endpoint based on line length
      const y2 = y1 + lineLength * Math.sin(angle); // Calculate endpoint based on line length

      P5.line(x1, y1, x2, y2); // Draw line from (x1, y1) to (x2, y2)

      angle += 2 * P5.TWO_PI / values.length * spacing;

    }

    P5.endShape();
  }

);


export const Ruxue_FFT = new Visualizer(
  'Ruxue_FFT',
  (P5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => {


    const width = window.innerWidth;
    const height = window.innerHeight / 2;
  
    const dim = Math.min(width, height);

    // P5.background(0, 0, 0, 255);

    P5.strokeWeight(dim * 0.01);
  
    const values = analyzers.fft.getValue();

  

    P5.beginShape();

  
    const barWidth = width / values.length;
    // P5.fill(0); 
   //fft
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
   
   
      const barHeight = P5.map(amplitude, -100, 0, height, 0); // Adjust mapping based on your needs

      const blueShade = P5.map(barHeight, 0, height, 255, 0); // Map the height to a shade of blue

      const c = P5.color(0, blueShade, blueShade);

      P5.fill(c);
      P5.stroke(c);


      // P5.fill(0, blueShade, blueShade);
      // P5.stroke(0, blueShade, blueShade);
     
      // P5.rect(i * barWidth, 0, barWidth - 1, barHeight);
      const x = i * barWidth;
      const y = height - barHeight;
  
      P5.rect(x, y, barWidth - 1, barHeight);
  
      // Apply animation effects (example: scaling)
      const scaleFactor = 1 + 0.1 * Math.sin(P5.frameCount * 0.1);
      P5.scale(scaleFactor);
  
      // Reset scaling for subsequent rectangles
      P5.scale(1 / scaleFactor);
    
    
      
    }

    P5.endShape();
  }

);

