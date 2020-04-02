import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppHeader from './components/AppHeader';
import PomodoroClock from './components/PomodoroClock';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Container className="bg-light" style={{minHeight: '100vh'}}>
        <div>
          <AppHeader />
          <section>
            <h2>What is Pomodoro ?</h2>
            <p className="text-justify">
              Pomodoro is a time management technique. It uses a timer to split a task into intervals named "pomodoros" (from 
              the Italian word wich refers to the tomato timer).
              For example, a task can be splitted in a set of 4 pomodoros of 25 minutes each with 5 minutes break between each.
              Thus, it allows a better assimilation of the work done and a maximum concentration during each pomodoro.
              After each set of pomodoros, a longer break can be taken (25 - 30 minutes).<br />
            </p>
            <div>
              If you are interrupted during your pomodoro, two solutions are possible :
              <ol>
                <li>Report the interruption to continue your pomodoro and not to lose your concentration.</li>
                <li>Stop your pomodoro to manage this interruption, then start a new pomodoro.</li>
              </ol>
            </div>
          </section>
        </div>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <PomodoroClock />
          </Col>
        </Row>
      </Container>
    );
  };
}

export default App;
