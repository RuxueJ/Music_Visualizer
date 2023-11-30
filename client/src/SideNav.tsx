// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React,  { useEffect, useState }  from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  RadioButton20,
  RadioButtonChecked20,
  Music20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';
import backgroundImage from './img/homepage_bg.jpg'; 

/** ------------------------------------------------------------------------ **
 * SideNav component
 ** ------------------------------------------------------------------------ */

type SideNavProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
  /**
   * 
   * SideNav
   * |-----------------|
   * | Nameless App    |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | InstrumentsNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   | 
   * |                 |
   * | VisualizersNav  |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * | SongsNav        |
   * | |-----------|   |
   * | |           |   |
   * | |-----------|   |
   * |                 |
   * |-----------------|
  */

  // Clock Nav
  const [currentTime, setCurrentTime] = React.useState<string>('');
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;  // Convert to 12-hour format

      const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
      setCurrentTime(timeString);
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);


  // // Record Nav
  // const [isRecording, setIsRecording] = React.useState<boolean>(false);
  // const startRecording = () => {
  //   dispatch(DispatchAction.startRecording());
  //   setIsRecording(true);
  // };
  // const stopRecording = () => {
  //   dispatch(DispatchAction.stopRecording());
  //   setIsRecording(false);
  // };


  return (
    <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
      <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray" style={{ color: 'green' }}>
        Music App by Team 009
      </div>
      <ClockNav currentTime={currentTime} />
      <div className="pa3">
        <input
          type="text"
          placeholder="Search..."
          className="w-100 pa2 ba b--light-gray"
          onChange={(e) => console.log('Search term:', e.target.value)}
        />
      </div>
      <div className="flex-auto">
        <InstrumentsNav state={state} dispatch={dispatch} />
        <VisualizersNav state={state} dispatch={dispatch} />
        <SongsNav state={state} dispatch={dispatch} />
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------------ **
 * SideNav Sub-Components
 ** ------------------------------------------------------------------------ */

 function InstrumentsNav({ state }: SideNavProps): JSX.Element {
  /** 
   *  InstrumentsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| | 
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */
  
  const instruments: List<Instrument> = state.get('instruments');
  const activeInstrument = state.get('instrument')?.name;
  const location = useLocation();

  return (
    <Section title="Instruments">
      {instruments.map(i => (
        <RadioButton
          key={i.name}
          to={`/${i.name}${location.search}`}
          text={i.name}
          active={i.name === activeInstrument}
          onClick={() => console.log(i.name)}
        />
      ))}
    </Section>
  );
}

function VisualizersNav({ state }: SideNavProps): JSX.Element {
  /** 
   *  VisualizersNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | RadioButton | |
   *  | |-------------| | 
   *  | | RadioButton | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */

  const visualizers: List<Visualizer> = state.get('visualizers');
  const activeVisualizer = state.get('visualizer')?.name;
  const location = useLocation();

  return (
    <Section title="Visualizers">
      {visualizers.map(v => (
        <RadioButton
          key={v.name}
          to={{
            pathname: location.pathname,
            search: `?visualizer=${v.name}`,
          }}
          text={v.name}
          active={v.name === activeVisualizer}
          onClick={() => console.log(v.name)}
        />
      ))}
    </Section>
  );
}

interface Song {
  id: number;
  song_title: string;
  notes: string;
  image_link: string; 
  author: string; 
  genre: string;
	public_time: string;
}

function SongsNav({ state, dispatch }: SideNavProps): JSX.Element {
  /** 
   * 
   *  SongsNav
   *  |-----------------|
   *  | Section         |
   *  | |-------------| |
   *  | | Music20     | |
   *  | |-------------| | 
   *  | | Music20     | |
   *  | |-------------| |
   *  |      ...        |
   *  |-----------------|
  */

  const songs: List<any> = state.get('songs', List());
  const [hoveredSong, setHoveredSong] = useState<Song | null>(null);
  return (
    <Section title="Playlists">
      {songs.map(song => (
        <div
          key={song.get('id')}
          className="f6 pointer underline flex items-center no-underline i dim"
          onClick={() =>
            dispatch(new DispatchAction('PLAY_SONG', { id: song.get('id')
            , song_title: song.get('song_title'), image_link: song.get('image_link'), author: song.get('author'), genre: song.get('genre'), public_time: song.get('public_time')
           }))
          }
          onMouseEnter={() => setHoveredSong(song)}
          onMouseLeave={() => setHoveredSong(null)}
          style={{ position: 'relative' }}
        >
          <Music20 className="mr1" />
          {song.get('song_title')}
          {hoveredSong === song && (
             <div className="tooltip" style={{ position: 'absolute', right: '0', top: '0' , background: "blue"}}>{song.get('song_title')}
              <div>{`Genre: ${song.get('genre')}`}</div>
              <div>{`Publish Time: ${song.get('public_time')}`}</div>
              <div>{`Author: ${ song.get('author')}`}</div>
            </div>
          )}
          
        </div>
      ))}
    </Section>
  );
}


/** ------------------------------------------------------------------------ **
 * Auxilliary components
 ** ------------------------------------------------------------------------ */

// Clock Function
function ClockNav({ currentTime }: { currentTime: string }): JSX.Element {
  return (
    <div className="f6 flex items-center black justify-center pa3">
      <div className="dim" style={{ fontSize: '1.5rem' }}>{currentTime}</div>
    </div>
  );
}

// // Record Function
// type RecordNavProps = {
//   startRecording: () => void;
//   stopRecording: () => void;
//   isRecording: boolean;
// };

// export function RecordNav({ startRecording, stopRecording, isRecording }: RecordNavProps): JSX.Element {
//   return (
//     <Section title="Record">
//     <div>
//       <button onClick={startRecording} disabled={isRecording}>
//         Start Recording
//       </button>
//       <button onClick={stopRecording} disabled={!isRecording}>
//         Stop Recording
//       </button>
//     </div>
//     </Section>
//   );
// }

/** ------------------------------------- **
 * Radio Button
 ** ------------------------------------- */

 type RadioButtonProps = {
  to: any,
  text: string,
  active: boolean,
  onClick: () => void
};

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
  return (
    <Link to={to} className="no-underline">
      <div
        className={classNames('f6 flex items-center black', { fw7: active })}
        onClick={onClick}
      >
        {active ? (
          <RadioButtonChecked20 className="mr1" />
        ) : (
          <RadioButton20 className="mr1" />
        )}
        <div className="dim">{text}</div>
      </div>
    </Link>
  );
}


/** ------------------------------------- **
 * Section
 ** ------------------------------------- */

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="flex flex-column h-25 bb b--light-gray pa3">
      <div className="fw7 mb2">{title} </div>
      <div className="flex-auto overflow-scroll">{children}</div>
    </div>
  );
};
