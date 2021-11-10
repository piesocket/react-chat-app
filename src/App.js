import './App.css';
import PieSocket from 'piesocket-js';
import { useState } from "react";
import Chat from "./Chat";


var piesocket = new PieSocket({
  clusterId: 'free3',
  apiKey: 'EwLJkPBMleXa1DwJsoNj8xUXqiv05oEeyCU9YbU4',
  notifySelf: 0
});

var channel = piesocket.subscribe("chat-room"); 

channel.listen('3000', function(data, meta){
  console.log("server running", data, meta);
});

channel.on('open', function(event){
  console.log("PieSocket connected!");
});


function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (username !== "") {
      setShowChat(true);
    }
  };
  
  return (
    <div className="App">
  {!showChat ? (
      <div className="chatBox">
        <h3>Join PieChat</h3>
        <input
          type="text"
          placeholder="Your Name"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && joinChat();
          }}
        />
        <button onClick={joinChat}>Join Chat</button>
      </div>
    ) : (
      <Chat channel={channel} username={username} />
    )}
  </div>
  );
}

export default App;
