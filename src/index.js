import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import Test from './Components/Auth';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt69B4Frqrs_gH-waHShywNYXCbU5KgJA",
  authDomain: "imagerepository-38d54.firebaseapp.com",
  databaseURL: "https://imagerepository-38d54.firebaseio.com",
  projectId: "imagerepository-38d54",
  storageBucket: "imagerepository-38d54.appspot.com",
  messagingSenderId: "60704598122",
  appId: "1:60704598122:web:6526b60ef6f9dd060c4213",
  measurementId: "G-WRL7SC5ZNE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

ReactDOM.render(
  <App />
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
