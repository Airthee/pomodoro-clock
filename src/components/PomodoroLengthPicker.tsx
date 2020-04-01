import React from 'react';

type PomodoroLengthPickerProps = {
  id: string
};

class PomodoroLengthPicker extends React.Component<PomodoroLengthPickerProps> {
  render() {
    return (
      <div>
        <div id={this.props.id}>{this.props.children}</div>
        <div></div>
      </div>
    );
  }
}

export default PomodoroLengthPicker;