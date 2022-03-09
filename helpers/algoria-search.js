require('dotenv').config();
const functions = require('firebase-functions');

const _ = require('lodash');
const algoliasearch = require('algoliasearch');
const Bluebird = require('bluebird');
const db = require('../libs/data/db').getDB();
const client = algoliasearch(
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_ADMIN_API_KEY_ID
);
const index = client.initIndex('documents');

exports.addToIndex = functions.firestore
  .document('documents/{documentId}')
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;

    return index.addObject({ ...data, objectID });
  });

exports.updateIndex = functions.firestore
  .document('documents/{documentId}')

  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    return index.addObject({ ...newData, objectID });
  });

exports.deleteFromIndex = functions.firestore
  .document('documents/{documentId}')

  .onDelete((snapshot) => index.deleteObject(snapshot.id));
