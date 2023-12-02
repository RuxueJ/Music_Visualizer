// 3rd party library imports
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Tone from 'tone';
import { Music32 } from '@carbon/icons-react';

// project imports
import { AppState } from './State';
import { DispatchAction } from './Reducer';
import { SideNav } from './SideNav';
import { InstrumentContainer } from './Instruments';
import { VisualizerContainer } from './Visualizers';


/** ------------------------------------------------------------------------ **
 * MainPage component
 ** ------------------------------------------------------------------------ */

type PanelProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

export function MainPage({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * Component Layout
   * 
   * MainPage
   * |------------------------------------------------------------------|
   * | SideNav   ShowWelcomePanel                                       |
   * | |---|     |---------------------------------------------------|  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |---|     | --------------------------------------------------|  |
   * |------------------------------------------------------------------|
   * 
   * or
   * 
   * MainPage
   * |------------------------------------------------------------------|
   * | SideNav   InstrumentAndVisualizerPanel                           |
   * | |---|     |---------------------------------------------------|  |
   * | |   |     | InstrumentPanel                                   |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |   |     | |                                               | |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |   |     |                                                   |  |
   * | |   |     | VisualizerPanel                                   |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |   |     | |                                               | |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |---|     | --------------------------------------------------|  |
   * |------------------------------------------------------------------|
   */

  const location = useLocation();
  const isWelcome = !state.get('instrument');

  useEffect(() => {
    dispatch(new DispatchAction('SET_LOCATION', { location }));
  }, [dispatch, location]);

  return (
    <div
      className="fixed top-0 left-0 h-100 w-100" 
      onClick={() => Tone.start()}
    >
      <SideNav state={state} dispatch={dispatch} />
      {isWelcome ? (
        <ShowWelcomePanel />
      ) : (
        <InstrumentAndVisualizerPanel state={state} dispatch={dispatch} />
      )}
    </div>
  );
}


/** ------------------------------------------------------------------------ **
 * MainPage Sub-Components
 ** ------------------------------------------------------------------------ */

/** ------------------------------------- **
 * Welcome
 ** ------------------------------------- */

function ShowWelcomePanel(): JSX.Element {
  // add background image
  const backgroundImage = require('./img/homepage_bg.jpg'); 
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column items-center justify-center"
      style={{ left: '16rem', ...backgroundStyle,}}
    >
      <div className="mw6 lh-copy mb4 white">
        <Music32 />
        <div className="f3 fw7 mb2" style={{fontFamily: 'Arial Black' }}>Welcome to the final project of CSC-600!!! </div>
        <div className="f4 mb3" style={{fontFamily: 'Arial Black' }}>
        Hello from Team 009!!!
          
        </div>
        <div className="f5" style={{fontFamily: 'Arial Black' }}> Select an instrument and a visualizer on the left and have fun!!!</div>
      </div>
    </div>
  );
}


/** ------------------------------------- **
 * Instrument and visualizer
 ** ------------------------------------- */

function InstrumentAndVisualizerPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles the instrument panel and visualizer panel together.
   */

  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column"
      style={{ left: '16rem', backgroundColor: '#F5F5F5',  color: 'magenta', fontFamily:'MV Boli', fontWeight: 'bolder' }}
    >
      <InstrumentPanel state={state} dispatch={dispatch} />
      <VisualizerPanel state={state} dispatch={dispatch} />
    </div>
  );
}


function InstrumentPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the instrument.
   */
  const instrument = state.get('instrument');

  return (
    <div>
      
      {instrument && (
        <InstrumentContainer
          state={state}
          dispatch={dispatch}
          instrument={instrument}
        />
      )}
    </div>
  );
}

function VisualizerPanel({ state }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the visualizer.
   */
  const visualizer = state.get('visualizer');

  return (
    <div > 
      {visualizer && (
        <VisualizerContainer key={visualizer.name} visualizer={visualizer} />
      )}
    </div>
  );
}
