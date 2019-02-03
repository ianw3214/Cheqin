import React, { Component } from 'react';
import './App.css';
import Auth from './Auth/Auth.js';
import firebase from "firebase";
import {
    Route,
    Redirect,
    NavLink,
    HashRouter
  } from "react-router-dom";


  

  
class App extends Component {
      

  render() {
    return(<div className="container-scroller App">
    <nav className="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
        <a className="navbar-brand brand-logo" href="index.html">
          <img src="images/logo_small.png" alt="logo" />
        </a>
        <a className="navbar-brand brand-logo-mini" href="index.html">
          <img src="images/logo_small.svg" alt="logo" />
        </a>
      </div>
      {
          this.props.auth.isAuthenticated() && (<>
      <div className="navbar-menu-wrapper d-flex align-items-center">
        <ul className="navbar-nav navbar-nav-right">
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
                  <h6 className="preview-subject font-weight-medium text-dark">Welcome to Daily Cheqin</h6>
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
              
          <span className="profile-text">Hello!</span>{/*<img className="img-xs rounded-circle" src="" alt="Profile"></img>*/}
              
            </a>
            <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="UserDropdown">
              <a className="dropdown-item mt-2">
                Account Settings
              </a>
              <a className="dropdown-item" onClick={() => this.props.auth.logout()}>
                Sign Out
              </a>
            </div>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span className="mdi mdi-menu"></span>
        </button>
      </div></>)}
    </nav>
    <div className="container-fluid page-body-wrapper">
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
        {
          this.props.auth.isAuthenticated() && (<>
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              <i className="menu-icon mdi mdi-television"></i>
              <span className="menu-title">Dashboard</span>
              </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="/overview">
                <i className="menu-icon mdi mdi-content-copy"></i>
                <span className="menu-title">Weekly Overview</span>
              </NavLink>
          <NavLink className="nav-link" to="/journal">
              <i className="menu-icon mdi mdi-content-copy"></i>
              <span className="menu-title">Journal Entries</span>
            </NavLink>
          </li>
          <li className="nav-item">
          <a className="nav-link" onClick={() => this.props.auth.logout()}>
              <i className="menu-icon mdi mdi-logout"></i>
              <span className="menu-title">Log Out</span>
            </a>
          </li></>)}
{
  !this.props.auth.isAuthenticated() && (
          <li className="nav-item">
            <a onClick={() => this.props.auth.login()} className="nav-link">
              <i className="menu-icon mdi mdi-login"></i>
              <span className="menu-title">Log in</span>
              </a>
          </li>)}
        </ul>
      </nav>
      <div className="main-panel">
        <div className="content-wrapper content">
              {this.props.innerContents}
              
        </div>
        <footer className="footer">
          <div className="container-fluid clearfix">
            <span className="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © 2019 {this.props.appName}. Built at QHacks 2019</span>
          </div>
        </footer>
      </div>
    </div>
    {this.props.auth.isAuthenticated() ? '' : <Redirect to='/login' />}
  </div>);
}
}


export default App;