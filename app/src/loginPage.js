import React, { Component } from "react";
 
class LoginPage extends Component {
    //static appNameType = AppNameContext;
  render() {
    return (
      <div>
        <h2>Sign in to {this.props.appName}</h2>
        <p>Access your daily journal entries & insights</p>
        <FireBaseWrapper></FireBaseWrapper>
      </div>
    );
  }
}
 
export default LoginPage;

class FireBaseWrapper extends Component {
      render() {
        return (
         <div></div>
        );
      }
    }