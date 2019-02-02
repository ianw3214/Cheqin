import React, { Component } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import {Redirect} from "react-router-dom";
  
class LoginPage extends Component {

  
    // Configure FirebaseUI.
    uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'redirect',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
      }
    };
  
    render() {
      if (!this.props.isSignedIn) {
        return (
          <div>
            <h2>Sign in to {this.props.appName}</h2>
            <h4>Journal and reflect on your day using the Google Assistant.</h4>
            <p>Encourage more self reflection, promote the expression of emotions and monitor mental wellbeing over time</p>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        );
      }
      return (
        <Redirect to='/' />
      );
    }
  }
 
export default LoginPage;