import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PomodoroLengthPicker from './PomodoroLengthPicker';
import PomodoroTimer from './PomodoroTimer';
import './PomodoroClock.scss';

type Props = {

};

type State = {
  breakLength: number,
  sessionLength: number,
  timerRunning: boolean
};

class PomodoroClock extends React.Component<Props, State> {
  state: State = {
    breakLength: 5,
    sessionLength: 25,
    timerRunning: false
  };

  constructor(props: Props) {
    super(props);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
  }

  incrementBreak() {
    this.setState((state) => ({
      breakLength: state.breakLength + 1
    }));
  }

  decrementBreak() {
    if (this.state.breakLength > 1) {
        this.setState((state) => ({
        breakLength: state.breakLength - 1
      }));
    }
  }

  incrementSession() {
    this.setState((state) => ({
      sessionLength: state.sessionLength + 1
    }));
  }

  decrementSession() {
    if (this.state.sessionLength > 1) {
      this.setState((state) => ({
        sessionLength: state.sessionLength - 1
      }));
    }
  }

  render() {
    return (
      <div className="pomodoro-clock">
        <Row>
          <Col>
            <PomodoroLengthPicker
              idPrefix="break"
              value={this.state.breakLength}
              onClickIncrement={this.incrementBreak}
              onClickDecrement={this.decrementBreak}
            >Break length</PomodoroLengthPicker>
          </Col>
          <Col>
            <PomodoroLengthPicker
              idPrefix="session"
              value={this.state.sessionLength}
              onClickIncrement={this.incrementSession}
              onClickDecrement={this.decrementSession}
            >Session length</PomodoroLengthPicker>
          </Col>
        </Row>
        <Row>
          <Col>
            <PomodoroTimer
              label="Session"
              startMinutes={this.state.sessionLength}
              running={this.state.timerRunning}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PomodoroClock;