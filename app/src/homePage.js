import React, { Component } from "react";
import LoginPage from "./loginPage";
 
class HomePage extends Component {
  render() {
    return (
      <div id="main_container">
        <h2>{this.props.appName}</h2>
        <h4>Journal and reflect on your day using the Google Assistant.</h4>
        <p>Welcome. Life is full of emotional ups and downs, we want to help you realize what makes you happy. Your voice journal entries are transcribed, analyzed anonymously using Machine Learning algorithms, securely stored and displayed to you in your personal online journal.</p>

        <h3>Our mission</h3>
        <p>Encourage more self reflection, promote the expression of emotions and monitor mental wellbeing over time.</p>
        </div>
    );
  }
}
 
export default HomePage;