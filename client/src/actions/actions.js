import { FacebookLogin, GoogleLogin, EmailLogin, EmailSignup, Logout } from '../firebase/actions';

// import firebase, { usersRef, groupsRef, msgRef, groupMsgRef, personalMsgRef, } from '../firebase';

import { push } from 'connected-react-router';


// Error Action
export var showError = (error) => {
	console.log('Error!', error);
	return (dispatch, getState) => {
		dispatch({
			type: 'SHOW_ERROR',
			error
		});
		setTimeout(() => {
			dispatch({
				type: 'CLEAR_ERROR'
			});
		}, 10000);
	}
}

// Auth Actions

export var login = (uid) => {
	console.log('User Logged In');
	return (dispatch, getState) => {
		dispatch({
			type: 'LOGIN_USER',
			uid
		});
		// dispatch(loadUserData(uid));
		if (window.location.pathname.indexOf('/dashboard') === -1) {
			dispatch(push('/dashboard'));
		}
	}
}

export var logout = () => {
	console.log('Logged Out!');
	return (dispatch, getState) => {
		return Logout()
			.then(() => {
				dispatch({
					type: 'LOGOUT_USER',
				});
				if (window.location.pathname !== '/') {
					dispatch(push('/'));
				}
			})
	// Go Offline!
	// firebase.database().goOffline();
	// dispatch(push('/'));
	}
}

export var loadUserData = (userData) => {
	return {
		type: 'LOAD_USER_DATA',
		userData
	}
}


export var startFacebookLogin = () => {
	console.log('Start Facebook Auth');
	return (dispatch, getState) => {
		return FacebookLogin()
			.then((result) => {
				console.log(result);
				var uid = result.user.uid;
				dispatch(login(uid));
			})
			.catch((err) => {
				dispatch(showError(err));
			})
	}
}

export var startGoogleLogin = () => {
	console.log('Start Google Auth');
	return (dispatch, getState) => {
		return GoogleLogin()
			.then((result) => {
				console.log(result);
				var uid = result.user.uid;
				dispatch(login(uid));
			})
			.catch((err) => {
				dispatch(showError(err));
			})
	}
}
