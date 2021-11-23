const dotenv = require('dotenv');
const firebase = require('firebase/app');
const fireConfig = require('../config/firestoreKey');
require('firebase/firestore');

dotenv.config();
// initalize firestore
firebase.initializeApp(fireConfig);
const db = firebase.firestore();

module.exports = db;
