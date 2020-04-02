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

class PomodoroControls extends React.Component<Props> {
  static defaultProps: DefaultProps = {
    onStartStop: () => {},
    onReset: () => {}
  }

  render() {
    return (
      <div className="pomodoro-controls d-flex flex-row justify-content-center">
        <div className="p-2">
          <span id="start_stop" className="pomodoro-controls--action" onClick={this.props.onStartStop}>
            <FontAwesomeIcon icon={this.props.running ? faPause : faPlay} size="2x"/>
          </span>
        </div>
        <div className="p-2">
          <span id="reset" className="pomodoro-controls--action" onClick={this.props.onReset}>
            <FontAwesomeIcon icon={faRedo} size="2x"/>
          </span>
        </div>
      </div>
    );
  }
}

export default PomodoroControls;