require('dotenv').config();
const { format } = require('util');
const GenerateName = require('./randomNameGenerator');
const db = require('../libs/data/db').getDB();

const storage = require('../libs/data/storage').getStorage();

const bucket = storage.bucket(process.env.BUCKET_NAME);

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
    const res = await db.collection(process.env.DOCUMENTS_COLLECTION).add(body);
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
    const docxonRef = db.collection(process.env.DOCUMENTS_COLLECTION);
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
    return Error('something went wrong try agian');
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
    return Error('something went wrong try agian');
  }
};

const updateDocumentById = async (documentId, doc) => {
  try {
    const docRef = await db
      .collection(process.env.DOCUMENTS_COLLECTION)
      .doc(documentId);
    const res = await docRef.set(doc, { merge: true });
    if (!res) {
      throw new Error('something went wrong when trying to update document');
    }
    return 'document update';
  } catch (err) {
    return Error('sorry update cancelled', err);
  }
};

module.exports = {
  uploadFile,
  uploadProperties,
  getDocumetnByUserId,
  getDocumentById,
  updateDocumentById,
};
