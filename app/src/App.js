import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import HomePage from "./homePage";
  import LoginPage from "./loginPage";
  import TestPage from "./testPage";

  const appName = "QHacks Journal";
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
            <h1>QHacks Journal</h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/test">Test Page</NavLink></li>
              <li><NavLink to="/login">Login</NavLink></li>
            </ul>
            <div className="content">
              <Route exact path="/" render={(routeProps) => (<HomePage appName={appName}  />)}/>
              <Route path="/test" render={(routeProps) => (<TestPage appName={appName}  />)}/>
              <Route path="/login" render={(routeProps) => (<LoginPage appName={appName}  />)}/>
            </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
