import React from 'react';
import './PomodoroTimer.scss';

type Props = {
  label: string,
  minutes: number,
  seconds: number
};

const PomodoroTimer = (props: Props) => {
  const renderTimeLeft = () => {
    const formattedMinutes = String(props.minutes).padStart(2, '0');
    const formattedSeconds = String(props.seconds).padStart(2, '0');
    return (
      <div id="time-left" className="pomodoro-timer--time-left">
        {formattedMinutes}:{formattedSeconds}
      </div>
    );
  }

  return (
    <div className="pomodoro-timer">
      <div id="timer-label" className="pomodoro-timer--label">{props.label}</div>
      {renderTimeLeft()}
    </div>
  );
}

export default PomodoroTimer;