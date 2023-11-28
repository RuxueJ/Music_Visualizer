// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';

import { Ruxue_FireworksForm } from './visualizers/RuxueJ';
import { Ruxue_FFT } from './visualizers/RuxueJ';
import { ZhengInstrument } from './instruments/RuxueJ';

import { QCInstrument } from './instruments/qchen1218';
import { QCVisualizer } from './visualizers/qchen1218';

import { Kao_Guitar } from './instruments/Kao_instrument';
import { Kao_vis } from './visualizers/Kao_visualizer';

import { HoangAnh_Instrument } from "./instruments/htran31";
import { HoangAnh_Visualizer } from './visualizers/htran31';
import { HoangAnh_Visualizer2 } from './visualizers/htran31';

// import {GuitarInstrument} from "./instruments/mkim797";

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, QCInstrument,ZhengInstrument, Kao_Guitar, HoangAnh_Instrument]);       // similar to Instrument[]
/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
  // similar to Visualizer[]
const visualizers = List([WaveformVisualizer, QCVisualizer, Ruxue_FireworksForm, Ruxue_FFT, Kao_vis, HoangAnh_Visualizer, HoangAnh_Visualizer2]);    // similar to Visualizer[]
// const visualizers = List([ JinVisualizer]); // test fft

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});
