// 3rd party library imports
import P5 from 'p5'; 
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const JinVisualizer = new Visualizer(
    'Jin_Visualizer',
    (p5: P5, analyzer: Tone.Analyser) => {
 
        const width = window.innerWidth;
        const height = window.innerHeight/2;
        const dim = Math.min(width, height);
    
        p5.background(0, 0, 0, 255);
    
        p5.strokeWeight(dim * 0.01);
        p5.stroke(255, 255, 255, 255);
        p5.noFill();
     
        analyzer.type = "fft"; // Set the analyzer type to FFT

// Now you can use the analyzer for frequency domain analysis

        const values = analyzer.getValue();
        // console.log(values);
        
        // console.log(values);
        // p5.beginShape(); 

// fft on this set of values
// Perform FFT to convert time domain data to frequency domain data
        // const fftSize = analyzer.size; // FFT size, usually a power of 2 (e.g., 256, 512, 1024)
        // const frequencyData = new Float32Array(fftSize);

        // let fft = new p5.FFT();
        // fft.setInput(values);

// Perform FFT and get frequency domain data
        // let spectrum = fft.analyze();

        // const barWidth = width / 256;
        
        // for (let i = 0; i < values.length; i++) {
            
        //   const amplitude = values[i] as number;
        // //   amplitude = amplitude +1000.0
        // const x = p5.map(i, 0, values.length - 1, 0, width);
        // const y = height / 2 + amplitude * height;
        // const r = amplitude * 20;
        // // console.log(values[i]);
        // //   const y = height / 2 + amplitude * height;
        //   // Place vertex
        //   p5.ellipse(x, y, r);
        // }
        // p5.endShape();
      },
  );
  