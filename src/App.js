import React from 'react';
import ReactDOM from 'react-dom';
import Auth from './Components/Auth';
import ImageRepo from './Components/ImageRepo';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function App() {
  //Firebase Authentication State Change Listener!
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      ReactDOM.render(<ImageRepo />,document.getElementById("App"));
    } 
    else {
      // No user is signed in.
      ReactDOM.render(<Auth />,document.getElementById("App"));
    }
  });

  return (
    <div className="App" id="App"></div>
  );
}

export default App;
