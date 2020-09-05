import React from 'react';
import ReactDOM from 'react-dom';
import { useContext } from 'react';
import { ToggleApp } from './Components/ContextManager';
// import './App.css';
import Auth from './Components/Auth';
import ImageRepo from './Components/ImageRepo';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function App() {

  // const [disp, setDisp] = useContext(ToggleApp);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // setDisp(true);
      ReactDOM.render(<ImageRepo />,document.getElementById("App"));
    } 
    else {
      // No user is signed in.
      // setDisp(false);
      ReactDOM.render(<Auth />,document.getElementById("App"));
    }
  });

  return (
    <div className="App" id="App">
      
    </div>
  );
}

export default App;
