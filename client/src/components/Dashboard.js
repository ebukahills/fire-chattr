import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import DashSideBar from './DashSideBar';
import GroupList from './GroupList';
import FriendList from './FriendList';
import GroupMessages from './GroupMessages';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div>
          { /* Navbar */ }
          <div className="w3-top">
            <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
              <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2"><i className="fa fa-bars" /></a>
              <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-home w3-margin-right" />BBO Chat</a>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="News"><i className="fa fa-globe" /></a>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Account Settings"><i className="fa fa-user" /></a>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white" title="Messages"><i className="fa fa-envelope" /></a>
              <div className="w3-dropdown-hover w3-hide-small">
                <button className="w3-button w3-padding-large" title="Notifications"><i className="fa fa-bell" /><span className="w3-badge w3-right w3-small w3-green">3</span></button>
                <div className="w3-dropdown-content w3-card-4 w3-bar-block" style={ { width: 300 } }>
                  <a href="#" className="w3-bar-item w3-button">One new friend request</a>
                  <a href="#" className="w3-bar-item w3-button">John Doe posted on your wall</a>
                  <a href="#" className="w3-bar-item w3-button">Jane likes your post</a>
                </div>
              </div>
              <a href="#" className="w3-bar-item w3-button w3-hide-small w3-right w3-padding-large w3-hover-white" title="My Account"><img src="//lorempixel.com/100/100" className="w3-circle" style={ { height: 25, width: 25 } } alt="Avatar" /></a>
            </div>
          </div>
          { /* Navbar on small screens */ }
          <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Groups</a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Friends</a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">My Profile</a>
          </div>
          { /* Page Container */ }
          <div className="w3-container w3-content" style={ { maxWidth: 1400, marginTop: 80 } }>
            { /* The Grid */ }
            <div className="w3-row">
              <DashSideBar />
              { /*Middle Column*/ }
                <Route exact path='/dashboard/' component={ GroupList } />
                <Route path='/dashboard/group/:id' component={ GroupMessages } />
              <FriendList />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;