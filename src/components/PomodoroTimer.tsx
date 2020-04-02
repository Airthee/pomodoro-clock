import React from 'react';

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
      <div id="time-left">
        {formattedMinutes}:{formattedSeconds}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div id="timer-label">{this.props.label}</div>
        {this.renderTimeLeft()}
      </div>
    );
  }
}

export default PomodoroTimer;