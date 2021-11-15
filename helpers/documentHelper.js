// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const { format } = require('util');
const dotenv = require('dotenv');
const firebase = require('firebase/app');
const fireConfig = require('../config/firestoreKey');
const gc = require('../config/');
require('firebase/firestore');

// storage configuration
dotenv.config();
const bucket = gc.bucket(process.env.BUCKET_NAME);

// initalize firestore
firebase.initializeApp(fireConfig);
const db = firebase.firestore();

const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname);
    const blobStream = blob.createWriteStream();
    blobStream
      .on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on('error', () => {
        reject(new Error('Unable to upload image, something went wrong'));
      })
      .end(buffer);
  });

const uploadProperties = async (body) => {
  try {
    const res = await db.collection('docxondb').add(body);
    if (!res) {
      throw new Error('something went wrong');
    }
    return res.id;
  } catch (err) {
    return Error('something went wrong');
  }
};

const getDocumetnByUserId = async (userId) => {
  try {
    const docxonRef = db.collection('docxondb');
    const snapshot = await docxonRef.where('userId', '==', userId).get();
    if (snapshot.empty) {
      return 'No matching documents.';
    }
    if (!snapshot) {
      throw new Error('something went wrong try to get documents');
    }
    const documents = [];
    snapshot.forEach((doc) => {
      // doc.data().docId = doc.id;
      documents.push(doc.id, doc.data());
    });
    return documents;
  } catch (err) {
    return Error('something went wront try agian');
  }
};

const getDocumentById = async (documentId) => {
  try {
    const docRef = await db.collection('docxondb').doc(documentId);
    const doc = await docRef.get();
    if (!doc.exists) {
      return 'No Such document exits';
    }
    return doc.data();
  } catch (err) {
    return Error('something went wront try agian');
  }
};

module.exports = {
  uploadFile,
  uploadProperties,
  getDocumetnByUserId,
  getDocumentById,
};
