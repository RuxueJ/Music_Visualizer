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
      p5.clear(0, 0, 0, 0);
    }, 100);
    console.log(`Frequency bin now}: ${values}`);
  }
);

export const HoangAnh_Visualizer2 = new Visualizer(
  'Anh_SnowForm',
  (p5: P5, analyzers: { waveform: Tone.Analyser; fft: Tone.Analyser }) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    const valuesA = analyzers.waveform.getValue();
    const valuesF = analyzers.fft.getValue();
    const numPoints = valuesA.length/2;
    const dim = Math.min(width, height);

    // Bezier shape parameters
    const x = width / 2 - 120;
    const y = height / 2;
    const changeX = x - 250;
    const changeY = y - 200;
    const h = 100; // Adjust the height as needed

    p5.strokeWeight(dim * 0.008);
    p5.noFill();

    p5.beginShape();
    for (let i = 0; i < numPoints; i++) {
      const t = i / (numPoints - 1);

 // Second bezier curve (half-circle)
 const circleRadius = 160; // Adjust the radius as needed
 const secondBezierX = width/2  + circleRadius * p5.cos(p5.PI * t) - 120;
 const secondBezierY = height / 2 + circleRadius * p5.sin(p5.PI * t) ;

 const firstBezierX = width/2  - circleRadius * p5.cos(p5.PI * t) - 120;
 const firstdBezierY = height / 2 - circleRadius * p5.sin(p5.PI * t);

 const frequency = valuesA[i] as number;
 const waveHeight = (frequency * height) / 2;


 const xWave2 = firstBezierX + waveHeight * p5.cos(p5.TWO_PI * t);
 const yWave2 = secondBezierY + waveHeight * p5.sin(p5.TWO_PI * t);

 const xWave1 = firstBezierX + waveHeight * p5.cos(p5.TWO_PI * t);
 const yWave1 = firstdBezierY- waveHeight * p5.sin(p5.TWO_PI * t);

 p5.stroke(
   "#" + ((i * 100 * 0xffffff) << 0).toString(16).padStart(6, "0")
 );

 if (frequency) {
  p5.point(xWave1, yWave1);
   p5.point(xWave2, yWave2);
   p5.point(randomInt(width), height - randomInt(height)*waveHeight);
 }
}
p5.endShape();


// let snowflakes: { x: number; y: number; speed: number }[] = [];

//  // Amplitude visualizer (snowfall)
//  for (let i = 0; i < valuesA.length; i++) {
//   const snowX = p5.random(width); // Random x position
//   const snowY = height; // Start from the bottom

//   const amplitude = valuesA[i] as number;
//   const snowSpeed = p5.map(amplitude, 0, 1, 1, 100); // Map amplitude to falling speed

//   // Update y position for falling effect with a random component
//   const updatedSnowX = snowX;
//   const updatedSnowY =
//     height - p5.random(0, height) * snowSpeed * amplitude;

//   p5.stroke(255); // White color for snowflakes

//   // Reset snowflake position if it goes beyond the top of the screen
//   if (amplitude && updatedSnowY < 0) {
//     p5.point(updatedSnowX, height); // Reset to the bottom
//   } else {
//     p5.point(updatedSnowX, updatedSnowY);
//   }
// }

setTimeout(() => {
  p5.clear(0, 0, 0, 0);
}, 10); // Adjust the delay (in milliseconds) as needed
}
);