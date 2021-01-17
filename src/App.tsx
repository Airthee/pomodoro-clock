import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PomodoroClock from './components/PomodoroClock';
import './App.scss';

const App = () => {
  return (
    <Container className="bg-light" style={{minHeight: '100vh'}}>
      <Row className="justify-content-center align-items-center">
        <Col sm={12} md={6}>
          <section>
            <h2>Qu'est ce qu'un timer "Pomodoro" ?</h2>
            <p className="text-justify">
              Pomodoro est une technique de gestion du temps.
              Elle consiste à utiliser un chronomètre pour découper une tâche en plusieurs intervals appelés "pomodoros" (du mot italien qui fait référence au chronomètre en forme de tomate).
              Par exemple, une tâche peut être découpée en 4 pomodoros de 25 minutes chacun avec 5 minutes de pauses entre chaque.
              Ainsi, cela permet une meilleure assimilation du travail effectué et une concentration maximum pendant chaque pomodoro.
              Après chaque groupe de pomodoro, une pause plus longue peut être prise (25 - 30 minutes).<br />
            </p>
            <div>
              Si vous êtes interrompu pendant votre pomodoro, deux solutions sont possibles :
              <ol>
                <li>Reporter l'interruption pour continuer le pomodoro et ne pas perdre votre concentration.</li>
                <li>Arrêter le pomodoro pour gérer cette interruption, puis recommencer un nouveau pomodoro.</li>
              </ol>
            </div>
          </section>
        </Col>
        <Col sm={12} md={6} className="text-center">
          <PomodoroClock />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
