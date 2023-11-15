// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';

import { JinVisualizer } from './visualizers/RuxueJ';

import { ZhengInstrument } from './instruments/RuxueJ';

import { QCInstrument } from './instruments/qchen1218';
import { QCVisualizer } from './visualizers/qchen1218';

import { Kao_Guitar } from './instruments/Kao_instrument';
import { Kao_vis } from './visualizers/Kao_visualizer';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, QCInstrument, ZhengInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
  // similar to Visualizer[]
const visualizers = List([WaveformVisualizer, QCVisualizer, JinVisualizer, Kao_vis]);    // similar to Visualizer[]


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