import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './PomodoroLengthPicker.scss';

type Props = {
  idPrefix: string,
  value: number,
  onClickIncrement: (() => void),
  onClickDecrement: (() => void)
};

const PomodoroLengthPicker: React.FunctionComponent<Props> = (props) => {
  const generateId = (suffix: string) => {
    return [props.idPrefix, suffix].join('-');
  }

  return (
    <div className="pomodoro-length-picker">
      <div id={generateId('label')} className="pomodoro-length-picker--label">{props.children}</div>
      <div className="d-flex justify-content-center align-items-center">
        <span id={generateId('decrement')} className="pomodoro-length-picker--arrow" onClick={props.onClickDecrement}>
          <FontAwesomeIcon icon={faArrowDown} size="2x" />
        </span>

        <span id={generateId('length')} className="pomodoro-length-picker--value">
          {props.value}
        </span>
        
        <span id={generateId('increment')} className="pomodoro-length-picker--arrow" onClick={props.onClickIncrement}>
          <FontAwesomeIcon icon={faArrowUp} size="2x" />
        </span>
      </div>
    </div>
  );
}

export default PomodoroLengthPicker;