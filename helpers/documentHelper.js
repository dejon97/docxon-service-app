const { format } = require('util');
const dotenv = require('dotenv');
const gc = require('../config/');
const GenerateName = require('./randomNameGenerator');
// storage configuration
const bucket = gc.bucket(process.env.BUCKET_NAME);
const db = require('../utils/connect');

dotenv.config();

const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const blob = bucket.file(originalname);
    const generatedName = GenerateName();
    const blobStream = blob.createWriteStream();
    blobStream
      .on('finish', () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${generatedName}${blob.name}`
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
    const res = await db.collection(process.env.Docxoncollection).add(body);
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
    console.log('userid', userId);
    const docxonRef = db.collection(process.env.Docxoncollection);
    const snapshot = await docxonRef.where('userId', '==', userId).get();
    if (snapshot.empty) {
      return 'No matching documents.';
    }
    if (!snapshot) {
      throw new Error('something went wrong try to get documents');
    }
    const documents = [];
    snapshot.forEach((doc) => {
      documents.push(doc.id, doc.data());
    });
    return documents;
  } catch (err) {
    return Error('something went wront try agian');
  }
};

const getDocumentById = async (documentId) => {
  try {
    const docRef = await db
      .collection(process.env.Docxoncollection)
      .doc(documentId);
    const doc = await docRef.get();
    if (!doc.exists) {
      return 'No Such document exits';
    }
    return doc.data();
  } catch (err) {
    return Error('something went wront try agian');
  }
};
const updateDocumentById = async (documentId, doc) => {
  try {
    const docRef = await db
      .collection(process.env.Docxoncollection)
      .doc(documentId);
    const res = await docRef.set(doc);
    if (!res) {
      return ' Update went wrong ';
    }
    return res;
  } catch (err) {
    return Error('soorry update callection', err);
  }
};

module.exports = {
  uploadFile,
  uploadProperties,
  getDocumetnByUserId,
  getDocumentById,
  updateDocumentById,
};
