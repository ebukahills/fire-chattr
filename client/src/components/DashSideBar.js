import React, { Component } from 'react';
import { base } from '../firebase';
import { showError } from '../actions/actions'
import { connect } from 'react-redux';

import { loadUserData } from '../actions/actions';

import LoadingState from './LoadingState';

class DashSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      userData: null
    };
  }
  componentWillReceiveProps() {
    setTimeout(() => {
      base.fetch(`users/${this.props.auth.user}`, {
        context: this,
      }).then(userData => {
        this.setState({
          userData,
          loaded: true
        })
        // Dispatch LOAD_USER_DATA here to have access from other components
        this.props.dispatch(loadUserData(userData));
        // console.log(userData, this.props.auth.user);
      }).catch(err => {
        this.props.dispatch(showError(err));
      })
    }, 2000);
  }
  render() {
    var {userData, loaded} = this.state;
    return (
      <div>
        { /* Left Column */ }
        <div className="w3-col m3">
          { /* Profile */ }
          { loaded ? (
            <div >
              <div className="w3-card-2 w3-round w3-white">
                <div className="w3-container fixpad">
                  <h4 className="w3-center">My Profile</h4>
                  <p className="w3-center"><img src={ userData.profilePic } className="w3-circle" style={ { height: 106, width: 106 } } alt="Avatar" /></p>
                  <hr />
                  <p><i className="fa fa-user fa-fw w3-margin-right w3-text-theme" />
                    { userData.userName }
                  </p>
                  <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme" /> Abuja, NG</p>
                  <p><i className="fa fa-envelope-o fa-fw w3-margin-right w3-text-theme" />
                    { userData.userEmail }
                  </p>
                </div>
              </div>
            </div>
            ) : (LoadingState()) }
          <br />
          { /* Accordion */ }
          <div className="w3-card-2 w3-round">
            <div className="w3-white">
              <button className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-circle-o-notch fa-fw w3-margin-right" /> My Groups</button>
              <button className="w3-button w3-block w3-theme-l1 w3-left-align"><i className="fa fa-users fa-fw w3-margin-right" /> My Friends</button>
              <div id="Demo3" className="w3-hide w3-container">
                <div className="w3-row-padding">
                  <br />
                  <div className="w3-half">
                    <img src="/w3images/lights.jpg" style={ { width: '100%' } } className="w3-margin-bottom" />
                  </div>
                  <div className="w3-half">
                    <img src="/w3images/nature.jpg" style={ { width: '100%' } } className="w3-margin-bottom" />
                  </div>
                  <div className="w3-half">
                    <img src="/w3images/mountains.jpg" style={ { width: '100%' } } className="w3-margin-bottom" />
                  </div>
                  <div className="w3-half">
                    <img src="/w3images/forest.jpg" style={ { width: '100%' } } className="w3-margin-bottom" />
                  </div>
                  <div className="w3-half">
                    <img src="/w3images/nature.jpg" style={ { width: '100%' } } className="w3-margin-bottom" />
                  </div>
                  <div className="w3-half">
                    <img src="/w3images/fjords.jpg" style={ { width: '100%' } } className="w3-margin-bottom" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          { /* Interests */ }
          <div className="w3-card-2 w3-round w3-white w3-hide-small">
            <div className="w3-container">
              <p>Interests</p>
              <p>
                <span className="w3-tag w3-small w3-theme-d5">News</span>
                <span className="w3-tag w3-small w3-theme-d2">Games</span>
                <span className="w3-tag w3-small w3-theme">Games</span>
                <span className="w3-tag w3-small w3-theme-l1">Friends</span>
                <span className="w3-tag w3-small w3-theme-l2">Food</span>
                <span className="w3-tag w3-small w3-theme-l3">Design</span>
                <span className="w3-tag w3-small w3-theme-l4">Art</span>
                <span className="w3-tag w3-small w3-theme-l5">Photos</span>
              </p>
            </div>
          </div>
          <br />
          { /* Alert Box */ }
          <div className="w3-container w3-display-container w3-round w3-theme-l4 w3-border w3-theme-border w3-margin-bottom w3-hide-small">
            <span className="w3-button w3-theme-l3 w3-display-topright">
                                       <i className="fa fa-remove" />
                                     </span>
            <p><strong>Hey!</strong></p>
            <p>People are looking at your profile. Find out who.</p>
          </div>
          { /* End Left Column */ }
        </div>
      </div>
    )
  }
}

// export default DashSideBar;
const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(DashSideBar);