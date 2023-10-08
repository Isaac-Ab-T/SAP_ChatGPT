// import React from 'react';

// class Incrementing extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       textBoxes: [],
//       msg:""
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     const newTextBoxes = [...this.state.textBoxes];
//     newTextBoxes.push(<label key={newTextBoxes.length}>{this.state.msg}</label>);
//     this.setState({ textBoxes: newTextBoxes ,msg:document.getElementById("entry")});
//   }

//   render() {
//     return (
//       <div>
//         {this.state.textBoxes}
//         <input type="text" id="entry"></input>
//         <button onClick={this.handleClick}>Enter</button>
        
//       </div>
//     );
//   }
// }

// export default Incrementing;
import React from 'react';

class Incrementing extends React.Component {
  constructor(props) 
  {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // axios.post('/api/generateResponse', { prompt: this.state.prompt })
    //   .then(response => {
    //     newMessages.push({text:response.data});
    //   })
    //   .catch(error => console.log(error));

    const newMessages = [...this.state.messages];
    newMessages.push({ text: document.getElementById("i1").value, sender: 'user1' });
    // newMessages.push({ text: 'Hi there!', sender: 'user2' });
    this.setState({ messages: newMessages, newMessage: '' });
  }

  render() {
    return (
      <div>
        {this.state.messages.map((message, index) => (
          <div key={index}>
            <label>{message.sender}: </label>
            <label>{message.text}</label>
          </div>
        ))}
        <form onSubmit={this.handleSubmit}>
          <label>User1: </label>
          <input type="text" id="i1" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
}

export default Incrementing;
