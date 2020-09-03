import React,{useState, createContext} from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const ToggleApp = createContext();

export const ToggleAppProvider = props => {
    const [disp,setDisp]=useState(false);

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
        var user = firebase.auth().currentUser;
        if (user) {
            // User is signed in.
             setDisp(true);
        } 
        else
            //User is signed out
            setDisp(false);
        }

    return(
    <ToggleApp.Provider value={[disp,setDisp]}>{props.children}</ToggleApp.Provider>
    )
}

