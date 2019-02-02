import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
    Route,
    Redirect,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import HomePage from "./homePage";
  import LoginPage from "./loginPage";
  import TestPage from "./testPage";

  import firebase from "firebase";
  // Configure Firebase.
const config = {
  apiKey: "AIzaSyAu2owEMXHV9UT7QO2oOyjNVNGSHqSfZLE",
    authDomain: "journalagent-db480.firebaseapp.com",
    databaseURL: "https://journalagent-db480.firebaseio.com",
    projectId: "journalagent-db480",
    storageBucket: "journalagent-db480.appspot.com",
    messagingSenderId: "472886687367"
};
firebase.initializeApp(config);

  const appName = "Daily CheqIn";
class App extends Component {


    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
          (user) => {
            this.setState({isSignedIn: !!user})
            this.onAuthStateChanged(firebase.auth().currentUser);
          }
      );
    }
    
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
      this.unregisterAuthObserver();
    }
      
  constructor(props) {
    super(props);
    this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    this.state = {isSignedIn: false, authUser: {}, userName: "Not signed in", userPhoto: null}
  }

  onAuthStateChanged(authUser){
    this.setState({ authUser: authUser})
    if(authUser != null) {
      this.setState({ userName: authUser.displayName, userPhoto: authUser.photoURL})
    }else{
      this.setState({ userName: "Not signed in", userPhoto: null})
    }
  }

  render() {
      return (
        <HashRouter>
          <div className="container-scroller App">
      <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
          {/*<a className="navbar-brand brand-logo" href="index.html">
            <img src="images/logo.svg" alt="logo" />
          </a>
          <a className="navbar-brand brand-logo-mini" href="index.html">
            <img src="images/logo-mini.svg" alt="logo" />
          </a>*/}
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center">
          <ul className="navbar-nav navbar-nav-right">
          {this.state.isSignedIn ? <>
            <li className="nav-item dropdown">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-toggle="dropdown">
                <i className="mdi mdi-bell"></i>
                <span className="count">1</span>
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <a className="dropdown-item">
                  <p className="mb-0 font-weight-normal float-left">You have 1 new notifications
                  </p>
                  <span className="badge badge-pill badge-warning float-right">View all</span>
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-success">
                      <i className="mdi mdi-alert-circle-outline mx-0"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <h6 className="preview-subject font-weight-medium text-dark">AHHHHHHH</h6>
                    <p className="font-weight-light small-text">
                      Just now
                    </p>
                  </div>
                </a>
                <div className="dropdown-divider"></div>
              </div>
            </li>
            <li className="nav-item dropdown d-none d-xl-inline-block">
              <a className="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                
                <span className="profile-text">Hello, {this.state.userName}!</span><img className="img-xs rounded-circle" src={this.state.userPhoto} alt="Profile"></img>
                
              </a>
              <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
                <a className="dropdown-item mt-2">
                  Account Settings
                </a>
                <a className="dropdown-item" onClick={() => firebase.auth().signOut()}>
                  Sign Out
                </a>
              </div>
            </li></> : ''}
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-menu"></span>
          </button>
        </div>
      </nav>
      <div className="container-fluid page-body-wrapper">
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
          <ul className="nav">
          {this.state.isSignedIn ? <>
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <i className="menu-icon mdi mdi-television"></i>
                <span className="menu-title">Dashboard</span>
                </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/test">
                <i className="menu-icon mdi mdi-content-copy"></i>
                <span className="menu-title">My Journal Entries</span>
              </NavLink>
            </li>
            <li className="nav-item">
            <a className="nav-link" onClick={() => firebase.auth().signOut()}>
                <i className="menu-icon mdi mdi-logout"></i>
                <span className="menu-title">Log Out</span>
              </a>
            </li>
            </> : ''}

            {this.state.isSignedIn ? '' : <>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <i className="menu-icon mdi mdi-login"></i>
                <span className="menu-title">Log in</span>
                </NavLink>
            </li>
            </>}
          </ul>
        </nav>
        <div className="main-panel">
          <div className="content-wrapper content">
                <Route exact path="/" render={(routeProps) => (<HomePage appName={appName}  isSignedIn={this.state.isSignedIn}/>)}/>
                <Route path="/test" render={(routeProps) => (<TestPage appName={appName}  />)}/>
                <Route path="/login" render={(routeProps) => (<LoginPage appName={appName} isSignedIn={this.state.isSignedIn} />)}/>
          </div>
          <footer className="footer">
            <div className="container-fluid clearfix">
              <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2019 {appName}. Built at QHacks 2019</span>
            </div>
          </footer>
        </div>
      </div>
      {this.state.isSignedIn ? '' : <Redirect to='/login' />}
    </div>

        </HashRouter>
      );
    
  }
}


export default App;
