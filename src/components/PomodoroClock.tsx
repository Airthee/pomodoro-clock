import React, { useState, useEffect, useCallback } from 'react';
import {Row, Col} from 'react-bootstrap';
import PomodoroLengthPicker from './PomodoroLengthPicker';
import PomodoroTimer from './PomodoroTimer';
import PomodoroControls from './PomodoroControls';
import './PomodoroClock.scss';

type Props = {};

enum TypeTimer {
  Session = 'session',
  Break = 'break'
};

type State = {
  breakLength: number,
  sessionLength: number,
  timerMinutes: number,
  timerSeconds: number,
  timerInterval: NodeJS.Timeout|undefined,
  currentTimer: TypeTimer
};

// Constants
const MAX_LENGTH = 60;
const MIN_LENGTH = 1;
const INITIAL_BREAK_LENGTH = 5;
const INTIIAL_SESSION_LENGTH = 25;

const PomodoroClock = (props: Props) => {
  const [ breakLength, setBreakLength ] = useState<number>(INITIAL_BREAK_LENGTH);
  const [ sessionLength, setSessionLength ] = useState<number>(INTIIAL_SESSION_LENGTH);

  // Timer management
  const [ currentTimer, setCurrentTimer ] = useState<TypeTimer>(TypeTimer.Session);
  const [ timerMinutes, setTimerMinutes ] = useState<number>(INTIIAL_SESSION_LENGTH);
  const [ timerSeconds, setTimerSeconds ] = useState<number>(0);
  const switchTimer = useCallback(() => {
    setTimerSeconds(0);

    switch(currentTimer) {
      // If we are in session
      // Set break timer and break timer values
      case TypeTimer.Session:
        setCurrentTimer(TypeTimer.Break);
        setTimerMinutes(breakLength);
        break;

      // If we are in break
      // Set session timer and session time values
      case TypeTimer.Break:
        setCurrentTimer(TypeTimer.Session);
        setTimerMinutes(sessionLength);
        break;
    }
  }, [ breakLength, currentTimer, sessionLength ]);

  const getTimerLabel = () => {
    switch(currentTimer) {
      case TypeTimer.Session: return 'Session';
      case TypeTimer.Break: return 'Break';
    }
  };

  // Timer interval management
  const [ timerInterval, setTimerInterval ] = useState<NodeJS.Timeout | null>();
  const clearTimerInterval = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
  };
  
  const audioRef = React.createRef<HTMLAudioElement>();

  // Reset state
  const resetState = () => {
    setBreakLength(INITIAL_BREAK_LENGTH);
    setSessionLength(INTIIAL_SESSION_LENGTH);
    setTimerMinutes(INTIIAL_SESSION_LENGTH);
    setTimerSeconds(0);
    setCurrentTimer(TypeTimer.Session);
    clearTimerInterval();
  };

  const handleTimerReset = () => {
    // Stop the audio if playing
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    resetState();
  };

  const handleTimerStartStop = () => {
    // If we have an interval, we clear and we set to null
    if (timerInterval) {
      clearTimerInterval();
    }

    // If we don't have interval, we set interval
    else {
      const timer = setInterval(() => {
        setTimerSeconds((currentSeconds) => {
          let newSeconds = currentSeconds - 1;

          // Case where a minute needs to decrement
          if (newSeconds < 0) {
            newSeconds = 59;
            setTimerMinutes((currentMinutes) => currentMinutes - 1);
          }
          return newSeconds;
        });
      },1000);
  
      // Affect timerInterval to state
      setTimerInterval(timer);
    }
  };

  // If minutes is < 0, play audio and switch timer
  useEffect(() => {
    if (timerMinutes < 0) {
      switchTimer();
    }
  }, [ timerMinutes, switchTimer ]);

  // If minutes and seconds reach 0, play sound
  useEffect(() => {
    if (timerMinutes === 0 && timerSeconds === 0) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      else {
        throw Error('No audio element');
      }
    }
  }, [ timerSeconds, timerMinutes, audioRef ]);

  const handleIncrementBreak = () => {
    setBreakLength((current) => {
      let newBreakLength = current;
      if (breakLength < MAX_LENGTH) {
        newBreakLength = breakLength + 1;
      }
      return newBreakLength;
    })
  };

  const handleDecrementBreak = () => {
    setBreakLength((current) => {
      let newBreakLength = current;
      if (breakLength > MIN_LENGTH) {
        newBreakLength = breakLength - 1;
      }
      return newBreakLength;
    })
  };

  const handleIncrementSession = () => {
    setSessionLength((current) => {
      let newSessionLength = current;
      if (sessionLength < MAX_LENGTH) {
        newSessionLength = current + 1;
  
        if (!timerInterval) {
          setTimerMinutes(newSessionLength);
        }
      }
      return newSessionLength;
    })
  };

  const handleDecrementSession = () => {
    setSessionLength((current) => {
      let newSessionLength = current;
      if (current > MIN_LENGTH) {
        newSessionLength = current - 1;
  
        if (!timerInterval) {
          setTimerMinutes(newSessionLength);
        }
      }
      return newSessionLength;
    })
  };

  const [classes, setClasses] = useState<Array<string>>([]);
  useEffect(() => {
    const newClasses = [
      'pomodoro-clock',
    ]

    // If timer is running
    // add class according to session or break
    if (timerInterval) {
      newClasses.push(currentTimer === TypeTimer.Session ? 'bg-danger' : 'bg-info');
    }
    else {
      newClasses.push('bg-secondary');
    }
    setClasses(newClasses);
  }, [currentTimer, timerInterval])


  return (
    <div className={classes.join(' ')}>
      <Row>
        <Col>
          <PomodoroLengthPicker
            idPrefix="break"
            value={breakLength}
            onClickIncrement={handleIncrementBreak}
            onClickDecrement={handleDecrementBreak}
          >Break length</PomodoroLengthPicker>
        </Col>
        <Col>
          <PomodoroLengthPicker
            idPrefix="session"
            value={sessionLength}
            onClickIncrement={handleIncrementSession}
            onClickDecrement={handleDecrementSession}
          >Session length</PomodoroLengthPicker>
        </Col>
      </Row>
      <Row>
        <Col>
          <PomodoroTimer
            label={getTimerLabel()}
            minutes={timerMinutes}
            seconds={timerSeconds}
          />
          <audio id="beep" ref={audioRef} src="/sounds/censor-beep-6.mp3" />
        </Col>
      </Row>
      <Row>
        <Col>
          <PomodoroControls
            running={Boolean(timerInterval)}
            onReset={handleTimerReset}
            onStartStop={handleTimerStartStop}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PomodoroClock;