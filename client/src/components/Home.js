import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startFacebookLogin, startGoogleLogin,
} from '../actions/actions';

class Home extends Component {
  render() {
    var {dispatch} = this.props;
    return (
      <div>
        <div>
          { /* Navbar */ }
          <div className="w3-top">
            <div className="w3-bar w3-theme-d2 w3-left-align w3-large">
              <a className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i className="fa fa-bars" /></a>
              <a href="#" className="w3-bar-item w3-button w3-padding-large w3-theme-d4"><i className="fa fa-home w3-margin-right" />BBO</a>
            </div>
          </div>
          { /* Navbar on small screens */ }
          <div id="navDemo" className="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Login</a>
            <a href="#" className="w3-bar-item w3-button w3-padding-large">Signup</a>
          </div>
        </div>
        { /* Page Container */ }
        <div className="w3-container w3-content" style={ { maxWidth: 1400, marginTop: 80 } }>
          { /* The Grid */ }
          <div className="w3-row">
            { /*Auth Row*/ }
            <div className="w3-row">
              <div className="w3-col s6 w3-center">
                { /*Signup*/ }
                <div>
                  <hr/>
                  <div className="w3-container w3-half w3-margin-top">
                    <form className="w3-container w3-card-4">
                      <p>
                        <input placeholder='Email' className="w3-input" type="email" style={ { width: '90%' } } required />
                      </p>
                      <p>
                        <input placeholder='Password' className="w3-input" type="password" style={ { width: '90%' } } required />
                      </p>
                      <p>
                        <input placeholder='Confirm Password' className="w3-input" type="password" style={ { width: '90%' } } required />
                      </p>
                      <p>
                        <button className="w3-button w3-section w3-teal w3-ripple"> Sign Up </button>
                      </p>
                    </form>
                    <div className='w3-panel w3-border-top w3-border-bottom w3-border-green'>
                      <button onClick={ () => dispatch(startGoogleLogin()) } className="w3-button w3-ripple w3-red"> <i className='fa fa-google'></i> Signup with Google</button>
                      <br/>
                      <br/>
                      <button onClick={ () => dispatch(startFacebookLogin()) } className="w3-button w3-ripple w3-blue"><i className='fa fa-facebook'></i> Signup with Facebook</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w3-col s6 w3-center">
                { /*Login*/ }
                <div>
                  <hr/>
                  <div className="w3-container w3-half w3-margin-top">
                    <form className="w3-container w3-card-4">
                      <p>
                        <input placeholder='Email' className="w3-input" type="email" style={ { width: '90%' } } required />
                      </p>
                      <p>
                        <input placeholder='Password' className="w3-input" type="password" style={ { width: '90%' } } required />
                      </p>
                      <p>
                        <button className="w3-button w3-section w3-teal w3-ripple"> Login </button>
                      </p>
                    </form>
                    <div className='w3-panel w3-border-top w3-border-bottom w3-border-green'>
                      <button onClick={ () => dispatch(startGoogleLogin()) } className="w3-button w3-ripple w3-red"> <i className='fa fa-google'></i> Login with Google</button>
                      <br/>
                      <br/>
                      <button className="w3-button w3-ripple w3-blue"><i className='fa fa-facebook'></i> Login with Facebook</button>
                      <br/>
                      <br/>
                      <button onClick={ () => dispatch(startFacebookLogin()) } className="w3-button w3-ripple w3-green"><i className='fa fa-question-mark'></i> Forgot Password?</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// export default Home;

export default connect()(Home);