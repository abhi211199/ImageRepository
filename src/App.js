import React from 'react';
import { useContext } from 'react';
import { ToggleApp } from './Components/ContextManager';
import './App.css';
import Auth from './Components/Auth';
import ImageRepo from './Components/ImageRepo';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function App() {

  const [disp, setDisp] = useContext(ToggleApp);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      setDisp(true);
    } 
    else {
      // No user is signed in.
      setDisp(false);
    }
  });

  return (
    //disp=true for ImageRepo and disp=false for Auth
    <div className="App">
      {!disp && <Auth />}
      {disp && <ImageRepo />}
    </div>
  );
}

export default App;
