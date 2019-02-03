import React, { Component } from 'react';
import { Route, Router, NavLink,Redirect } from 'react-router-dom';
import App from './App';
import Callback from './callback/Callback.js';
import Auth from './Auth/Auth.js';
import history from './history';
import HomePage from "./homePage";
import firebase from "firebase";
import LoginPage from "./loginPage";
import WeekOverview from "./weekoverview";
import JournalEntries from "./journalEntries";

  
  // Configure Firebase.
  var config = {
    apiKey: "AIzaSyDnmprTKJt-VYkhVDryq9G4a_2JjHMYVJM",
    authDomain: "daily-cheqin.firebaseapp.com",
    databaseURL: "https://daily-cheqin.firebaseio.com",
    projectId: "daily-cheqin",
    storageBucket: "daily-cheqin.appspot.com",
    messagingSenderId: "709508738073"
  };
  firebase.initializeApp(config);
  
  const appName = "Daily CheqIn";
  const auth = new Auth();
  

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
      
        <div>
        <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          <Route path="/" render={(props) => <App appName={appName} auth={auth} innerContents={<>
          <Route exact path="/" render={(routeProps) => (<HomePage appName={appName}  auth={auth} />)}/>
              <Route path="/journal" render={(routeProps) => (<JournalEntries auth={auth} appName={appName}  />)}/>
              <Route path="/login" render={(routeProps) => (<LoginPage auth={auth} appName={appName} />)}/>
              <Route path="/overview" render={(routeProps) => (<WeekOverview auth={auth} appName={appName}  />)}/></>} />} />
          
          
        </div>
      </Router>
  );
}
