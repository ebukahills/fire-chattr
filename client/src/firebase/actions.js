import firebase, { usersRef } from './';

import store from '../';

import { logout, login, showError, } from '../actions/actions';



/**
 * Authentication Actions
 * @returns Promise
 */

// Facebook Login
export var FacebookLogin = () => {
	var provider = new firebase.auth.FacebookAuthProvider();
	return firebase.auth().signInWithPopup(provider)
}

export var GoogleLogin = () => {
	var provider = new firebase.auth.GoogleAuthProvider();
	return firebase.auth().signInWithPopup(provider)
}

export var EmailSignup = (email, password) => {
	return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export var EmailLogin = (email, password) => {
	return firebase.auth().signInWithEmailAndPassword(email, password)
}

export var Logout = () => {
	return firebase.auth().signOut();
}


// Listen for Authentication State Changes 

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		// User just logged in
		var userID = user.uid;
		var userName = user.displayName;
		var profilePic = user.photoURL;
		var userEmail = user.email

		// Check if user already exists

		usersRef.child(userID).once('value')
			.then((snapshot) => {
				if (!snapshot.exists()) {
					// If not, Run signup Logic for New Users
					console.log('New User!');
					usersRef.child(userID).set({
						userID,
						userName,
						profilePic,
						userEmail
					}).then((data) => {
						store.dispatch(login(userID));
					}).catch((err) => {
						store.dispatch(showError(err));
					})
				} else {
					console.log('User Exists');
					store.dispatch(login(userID));
				}
			})
			.catch((err) => {
				store.dispatch(showError(err));
			});
	} else {
		// User just signed out. Run signout logic here
		store.dispatch(logout());
	}
});