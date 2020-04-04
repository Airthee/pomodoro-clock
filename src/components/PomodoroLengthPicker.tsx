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

class PomodoroLengthPicker extends React.Component<Props> {
  generateId(suffix: string) {
    return [this.props.idPrefix, suffix].join('-');
  }

  render() {
    return (
      <div className="pomodoro-length-picker">
        <div id={this.generateId('label')} className="pomodoro-length-picker--label">{this.props.children}</div>
        <div className="d-flex justify-content-center align-items-center">
          <span id={this.generateId('decrement')} className="pomodoro-length-picker--arrow" onClick={this.props.onClickDecrement}>
            <FontAwesomeIcon icon={faArrowDown} size="2x" />
          </span>

          <span id={this.generateId('length')} className="pomodoro-length-picker--value">
            {this.props.value}
          </span>
          
          <span id={this.generateId('increment')} className="pomodoro-length-picker--arrow" onClick={this.props.onClickIncrement}>
            <FontAwesomeIcon icon={faArrowUp} size="2x" />
          </span>
        </div>
      </div>
    );
  }
}

export default PomodoroLengthPicker;