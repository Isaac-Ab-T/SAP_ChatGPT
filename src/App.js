import logo from './logo.svg';
import './App.css';
import Greet1 from './components/Greet';
import Welcome from './components/Welcome';
import Hello from './components/Hello';
import Chat from './components/Chat';
import Incrementing from './components/Incrementing';
import Trial1 from './components/trial1';
import Dictaphone from './components/speech';
import Speech_text from './components/speech_text';
function Btn()
{
  return (<button onClick={console.log("Clicked!")}>Submit</button>);
}
function App()
{
  return (
    <div className="App">
      {/*<Greet1/>*/}
      {/*<Welcome/>*/}
      {/* <Greet1 name="Isaac" time="01"> 
      <p>Secondary Info</p>
      </Greet1> */}
      {/* <Chat/>
      <Incrementing/> */}
      
      <Trial1/>
    </div>
  );
}

export default App;
