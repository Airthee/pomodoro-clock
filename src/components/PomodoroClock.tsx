import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PomodoroLengthPicker from './PomodoroLengthPicker';
import PomodoroTimer from './PomodoroTimer';
import PomodoroControls from './PomodoroControls';
import './PomodoroClock.scss';

type Props = {};

type State = {
  breakLength: number,
  sessionLength: number,
  timerMinutes: number,
  timerSeconds: number,
  timerInterval: NodeJS.Timeout|null
};

// Constants
const MAX_LENGTH = 60;
const MIN_LENGTH = 1;
const INITIAL_BREAK_LENGTH = 5;
const INTIIAL_SESSION_LENGTH = 25;
const INITIAL_STATE = {
  breakLength: INITIAL_BREAK_LENGTH,
  sessionLength: INTIIAL_SESSION_LENGTH,
  timerMinutes: INTIIAL_SESSION_LENGTH,
  timerSeconds: 0,
  timerInterval: null
};

class PomodoroClock extends React.Component<Props, State> {
  state: State = {
    ...INITIAL_STATE
  };

  constructor(props: Props) {
    super(props);
    this.handleIncrementBreak = this.handleIncrementBreak.bind(this);
    this.handleDecrementBreak = this.handleDecrementBreak.bind(this);
    this.handleIncrementSession = this.handleIncrementSession.bind(this);
    this.handleDecrementSession = this.handleDecrementSession.bind(this);
    this.handleTimerReset = this.handleTimerReset.bind(this);
    this.handleTimerStartStop = this.handleTimerStartStop.bind(this);
    this.clearTimerInterval = this.clearTimerInterval.bind(this);
  }

  clearTimerInterval() {
    if (this.state.timerInterval !== null) {
      clearInterval(this.state.timerInterval);
    }
  }

  handleTimerReset() {
    this.setState((state) => {
      this.clearTimerInterval();
      return {
        ...INITIAL_STATE
      };
    });
  }

  handleTimerStartStop() {
    // If we have an interval, we clear and we set to null
    if (this.state.timerInterval !== null) {
      this.clearTimerInterval();
      this.setState({
        timerInterval: null
      });
    }

    // If we don't have interval, we set interval
    else {
      const timer = setInterval(() => {
        this.setState((state: State) => {
          // Sustract a second
          const newState: State = {
            ...state,
            timerSeconds: state.timerSeconds - 1,
            timerMinutes: state.timerMinutes
          }
          
          // Case where a minute needs to decrement
          if (newState.timerSeconds < 0) {
            newState.timerSeconds = 59;
            newState.timerMinutes -= 1;
          }
  
          return newState;
        });
      },1000);
  
      // Affect timerInterval to state
      this.setState({
        timerInterval: timer
      });
    }

  }

  handleIncrementBreak() {
    if (this.state.breakLength < MAX_LENGTH) {
      this.setState((state: State) => ({
        breakLength: state.breakLength + 1
      }));
    }
  }

  handleDecrementBreak() {
    if (this.state.breakLength > MIN_LENGTH) {
        this.setState((state: State) => ({
        breakLength: state.breakLength - 1
      }));
    }
  }

  handleIncrementSession() {
    if (this.state.sessionLength < MAX_LENGTH) {
      this.setState((state: State) => {
        const newState: State = {
          ...state,
          sessionLength: state.sessionLength + 1,
        };

        if (state.timerInterval === null) {
          newState.timerMinutes = newState.sessionLength
        }
        
        return newState;
      });
    }
  }

  handleDecrementSession() {
    if (this.state.sessionLength > MIN_LENGTH) {
      this.setState((state: State) => {
        const newState: State = {
          ...state,
          sessionLength: state.sessionLength - 1,
        };

        if (state.timerInterval === null) {
          newState.timerMinutes = newState.sessionLength
        }
        
        return newState;
      });
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
              onClickIncrement={this.handleIncrementBreak}
              onClickDecrement={this.handleDecrementBreak}
            >Break length</PomodoroLengthPicker>
          </Col>
          <Col>
            <PomodoroLengthPicker
              idPrefix="session"
              value={this.state.sessionLength}
              onClickIncrement={this.handleIncrementSession}
              onClickDecrement={this.handleDecrementSession}
            >Session length</PomodoroLengthPicker>
          </Col>
        </Row>
        <Row>
          <Col>
            <PomodoroTimer
              label="Session"
              minutes={this.state.timerMinutes}
              seconds={this.state.timerSeconds}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <PomodoroControls
              running={this.state.timerInterval !== null}
              onReset={this.handleTimerReset}
              onStartStop={this.handleTimerStartStop}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default PomodoroClock;