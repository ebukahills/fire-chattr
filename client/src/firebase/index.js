import firebase from 'firebase';
import Rebase from 're-base';

import { firebaseConfig as config } from '../config'

// Initialize Firebase
firebase.initializeApp(config);


export var db = firebase.database();
export var dbRef = db.ref();
export var usersRef = dbRef.child('users');

export var storageRef = firebase.storage().ref();

export var base = Rebase.createClass(db);

export default firebase;