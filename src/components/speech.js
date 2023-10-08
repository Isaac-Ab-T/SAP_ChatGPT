import React, { Component } from 'react';

class Dictaphone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listening: false,
      transcript: ''
    };

    this.recognition = new window.webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.recognition.onresult = this.handleResult;
  }

  handleResult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    this.setState({ transcript });
  }

  toggleListen = () => {
    this.setState(prevState => ({
      listening: !prevState.listening
    }), () => {
      if (this.state.listening) {
        this.recognition.start();
      } else {
        this.recognition.stop();
      }
    });
  }

  render() {
    const { listening, transcript } = this.state;

    return (
      <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={this.toggleListen}>
          {listening ? 'Stop' : 'Start'}
        </button>
        <p>{transcript}</p>
      </div>
    );
  }
}

export default Dictaphone;
