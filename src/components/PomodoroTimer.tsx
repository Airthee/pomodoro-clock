import React from 'react';

type Props = {
  label: string,
  running: boolean,
} & Required<DefaultProps>;

type DefaultProps = {
  startMinutes: number,
  startSeconds: number,
  onChange: ((minutes: number, seconds: number) => void)
};

type State = {
  minutes: number,
  seconds: number,
};

class PomodoroTimer extends React.Component<Props, State> {
  static defaultProps: DefaultProps = {
    startMinutes: 0,
    startSeconds: 0,
    onChange: () => {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      minutes: this.props.startMinutes,
      seconds: this.props.startSeconds
    };
  }

  renderTimeLeft() {
    const formattedMinutes = String(this.state.minutes).padStart(2, '0');
    const formattedSeconds = String(this.state.seconds).padStart(2, '0');
    return (
      <div id="time-left">
        <span>{formattedMinutes}</span>
        <span> : </span>
        <span>{formattedSeconds}</span>
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