import React from 'react';
import {Row, Col} from 'react-bootstrap';
import PomodoroLengthPicker from './PomodoroLengthPicker';

class PomodoroClock extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <PomodoroLengthPicker id="break-label">Break length</PomodoroLengthPicker>
          </Col>
          <Col>
            <PomodoroLengthPicker id="session-label">Session length</PomodoroLengthPicker>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PomodoroClock;