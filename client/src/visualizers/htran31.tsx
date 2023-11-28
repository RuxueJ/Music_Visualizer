// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

//generate random colors
const randomColors = Array(50).fill(0).map(() => "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"));
const randomInt = (max: number) => Math.floor(Math.random() * max) + 1;

export const HoangAnh_Visualizer = new Visualizer(
  'Anh_WallForm',
  // (p5: P5, analyzer: Tone.Analyser) => {
    (p5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);
    
    p5.strokeWeight(dim * 0.01);
    p5.noFill();
    // const values = analyzer.getValue();
    const values = analyzers.waveform.getValue();
    p5.beginShape();

    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const initialPoints = 30;
      const movement = width / initialPoints;
      const x = Math.max(i, 0) * movement;
      const y = height;
      const h = amplitude * height * 2;

      if (amplitude !== 0) {
        p5.fill(randomColors[i % initialPoints]);
        p5.rect(x, y, initialPoints, h, 5);
      }
      console.log(`Frequency bin ${i}: ${amplitude}`);
    }
    p5.endShape();
  
    setTimeout(() => {
      p5.clear();
    }, 100);
    console.log(`Frequency bin now}: ${values}`);
  }
);

export const HoangAnh_Visualizer2 = new Visualizer(
  "Anh_NewForm",
  // (p5: P5, analyzer: Tone.Analyser) => {
  (p5: P5, analyzers: {waveform: Tone.Analyser;fft:Tone.Analyser}) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.strokeWeight(dim * 0.005);
    p5.noFill();

    // const values = analyzer.getValue();
    const values = analyzers.waveform.getValue();
    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;
      const x = width / 2 - 120;
      const y = height / 2;
      const h = height / 2 + amplitude * height;
      p5.stroke(
        "#" + ((i * 100 * 0xffffff) << 0).toString(16).padStart(6, "0")
      );
      p5.ellipse(x, y, h, h);
    }
    p5.endShape();

    setTimeout(() => {
      p5.clear();
    }, 100);
  }
);