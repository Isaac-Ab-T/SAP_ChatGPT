import React, { Component } from 'react';
import Dictaphone from './speech';

class Speech_text extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMethod: 'text'
    };
  }

  toggleInputMethod = () => {
    const { inputMethod } = this.state;
    this.setState({
      inputMethod: inputMethod === 'text' ? 'microphone' : 'text'
    });
  };

  render() {
    const { inputMethod } = this.state;

    return (
      <div>
        <button onClick={this.toggleInputMethod}>
          {inputMethod === 'text' ? 'Use Microphone' : 'Use Text Input'}
        </button>
        {inputMethod === 'text' ? (
          <input type="text" placeholder="Enter text input" />
        ) : (
          <Dictaphone />
        )}
      </div>
    );
  }
}

export default Speech_text;
