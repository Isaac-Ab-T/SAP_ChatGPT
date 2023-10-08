import React from 'react';
import axios from "axios";
import voice_on from "../images/voice_on.png";
import voice_off from "../images/voice_off.png";




import './trial1.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
class Trial1 extends React.Component 
{
  constructor(props) {
    super(props);
      this.state = {
        prompt: '',
        response: '',
        reps:[],
        pros:[],
        dummy:"",
        listening: false,
        transcript: '',
        input:1,
      };
    
  this.handleSubmit=this.handleSubmit.bind(this);  
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
    console.log("Transcript : ",this.state.transcript,this.state.input);
    this.setState({ transcript });
    this.setState({input:2});
  }

  toggleListen = () => {
    this.setState(prevState => ({
      listening: !prevState.listening
    }), () => {
      if (this.state.listening) {
        this.recognition.start();
      } else {
        this.recognition.stop();
        //console.log("Final Transcript :",this.state.transcript," ",this.state.input);
        //this.state.prompt=this.state.transcript;
        //this.handleSubmit();
      }
    });
  }
  

  handleInputChange = (event) => {
    this.setState({dummy:event.target.value});
    //this.setState({ prompt: event.target.value });
  };

  handleSubmit = (event) => 
  {
  event.preventDefault();    
    console.log("Dummy",this.state.dummy,"\t Transcript value",this.state.input);
    let prompt;
     
    if(this.state.input===1)
    { prompt=this.state.dummy;
      console.log("Duplicated :"+prompt+" Other "+this.state.pros.slice(-1));
      if(prompt===this.state.pros.slice(-1))
      {
        return 1;
      }
    }
    else if(this.state.input!==1)
    {
      this.state.dummy=this.state.transcript;
      prompt=this.state.transcript;
      this.setState({input:1});
    } 
    console.log("Prompt1 ",prompt);
    console.log("Duplicated A:"+prompt+" Other "+this.state.pros.slice(-1));
    
    if (prompt!=="")
    {
      axios
      .post("http://localhost:8080/chat",{prompt})
      .then((res)=>{
        this.setState((prevState)=>(
          {
            prompt:this.state.dummy,
          response:res.data,
          reps:[...prevState.reps,this.state.response],
          pros:[...prevState.pros,this.state.prompt],
          

        }),()=>{console.log("Answer :",this.state.reps,'\t',this.state.response); this.setState({dummy:""})});
      })
      .catch((err)=>{
        console.error(err);
      });

    }
    
    // this.setState((prevState)=>(
    //   {
    //     reps:[...prevState.reps,this.state.response]
    //   }
    // ),()=>{console.log("Answer :",this.state.reps,"\t",this.state.response)});
    //this.setState({ reps:reps1},()=>{console.log("Answer :",this.state.reps)});
    //console.log("Answer:",this.state.response,this.state.reps);

    
  };
  componentDidMount()
  {
    
    axios.post("http://localhost:8080/reload").then(res => {
      console.log(res.data);
      this.setState({ message: "Conversation history cleared." });
    });
  }
  rendering_btn()
  {
    if(this.state.listening===true) {
      return (       
      <button onClick={this.toggleListen}>
        <img src={voice_on} height="40px" width="40px"></img>
          </button>
      );
    } 
    else if(this.state.listening===false) {
      return (
        <button onClick={this.toggleListen}>
        <img src={voice_off} height="40px" width="40px"></img>
        </button>
      );
    }
  }
  render() {
    const messages = [];
    const { listening, transcript } = this.state;
    for (let i = 1; i < Math.max(this.state.reps.length, this.state.pros.length); i++) {
      if (i<this.state.pros.length) {
        messages.push({ message: this.state.pros[i], sender: 'me' });
      }
      if (i<this.state.reps.length) {
        if(i>=1)
        {
          messages.push({ message: this.state.reps[i], sender: 'bot' });  
        }
        
      }
    }
    console.log()

    return (
      // <div>
      //   <form >
      //     <input type="text" value={this.state.prompt} onChange={this.handleInputChange} />
      //     <button type="submit" onClick={this.handleSubmit} >Submit</button>
      //   </form>
      //   <p>{this.state.reps}</p>
      // </div>
          <div className="chatbox">
          <div className="header">
          <h1>HDFC Chatbot </h1>
    
          </div>
          <div className="conversation">
          {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === 'me' ? 'message message-user' : 'message message-bot'}
          >
            <p>{message.message}</p>
          </div>
        ))}
            
            <div className="message message-user">
              <p>{this.state.prompt}</p>
            </div> 
            <div className="message message-bot">
              <p>{this.state.response}</p>
            </div>
        
          </div>
          <form className='top1' onSubmit={this.handleSubmit}>
            <div>
    
            </div>
            <div className="message-input">
              <input type="text" id="i1"  value={this.state.dummy} onChange={this.handleInputChange}/>
            <button type="submit" onClick={this.handleSubmit}>Send</button>
           {this.rendering_btn()}
            <div>
              
            </div>
            </div>
            
          </form>
        </div>
    );
  }
}

export default Trial1;
