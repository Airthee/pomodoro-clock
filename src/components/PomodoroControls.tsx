import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons';
import './PomodoroControls.scss';

type Props = {
  running: boolean
} & Partial<DefaultProps>;

type DefaultProps = {
  onStartStop: () => void,
  onReset: () => void,
};

const PomodoroControls = (props: Props) => {
  return (
    <div className="pomodoro-controls d-flex flex-row justify-content-center">
      <div className="p-2">
        <span id="start_stop" className="pomodoro-controls--action" onClick={props.onStartStop}>
          <FontAwesomeIcon icon={props.running ? faPause : faPlay} size="2x"/>
        </span>
      </div>
      <div className="p-2">
        <span id="reset" className="pomodoro-controls--action" onClick={props.onReset}>
          <FontAwesomeIcon icon={faRedo} size="2x"/>
        </span>
      </div>
    </div>
  );
}

PomodoroControls.defaultProps = {
  onStartStop: () => {},
  onReset: () => {}
}

export default PomodoroControls;