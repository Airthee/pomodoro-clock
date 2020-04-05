import React from 'react';
import './PomodoroTimer.scss';

type Props = {
  label: string,
  minutes: number,
  seconds: number
};

class PomodoroTimer extends React.Component<Props> {
  renderTimeLeft() {
    const formattedMinutes = String(this.props.minutes).padStart(2, '0');
    const formattedSeconds = String(this.props.seconds).padStart(2, '0');
    return (
      <div id="time-left" className="pomodoro-timer--time-left">
        {formattedMinutes}:{formattedSeconds}
      </div>
    );
  }

  render() {
    return (
      <div className="pomodoro-timer">
        <div id="timer-label" className="pomodoro-timer--label">{this.props.label}</div>
        {this.renderTimeLeft()}
      </div>
    );
  }
}

export default PomodoroTimer;