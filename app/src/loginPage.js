import React, { Component } from "react";
import {Redirect} from "react-router-dom";
  
class LoginPage extends Component {
  
    render() {
      //this.props.auth.login();
      if (!this.props.isSignedIn) {
        
        return (
          <div>
            <h2>Sign in to {this.props.appName}</h2>
            <h4>Journal and reflect on your day using the Google Assistant.</h4>
            <p>Encourage more self reflection, promote the expression of emotions and monitor mental wellbeing over time</p>
            <button type="button" onClick={() => this.props.auth.login()} class="btn btn-primary">Log In</button>
          </div>
        );
      }
      return (
        <Redirect to='/' />
      );
    }
  }
 
export default LoginPage;