require('dotenv').config();
const { Console } = require('console');
const { format } = require('util');
const GenerateName = require('./randomNameGenerator');
const db = require('../libs/data/db').getDB();
const {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} = require('firebase/firestore');
const bucket = require('../libs/data/storage').getBucket();

const uploadFile = (file) => {
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
};

const uploadFileFromBuffer = (buffer, filename) => {
  return new Promise((resolve, reject) => {
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream();

    blobStream
      .on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on('error', () => {
        reject(new Error('Unable to upload image, something went wrong'));
      })
      .end(buffer);
  });
};

const uploadProperties = async (body) => {
  try {
    // body.timestamp = db.FieldValue.serverTimestamp();

    const res = await db.collection(process.env.DOCUMENTS_COLLECTION).add(body);
    if (!res) {
      throw new Error('something went wrong');
    }
    return res.id;
  } catch (err) {
    return Error('something went wrong');
  }
};
const uploadpersonalProperties = async (body) => {
  try {
    // body.timestamp = db.FieldValue.serverTimestamp();

    const res = await db
      .collection(process.env.PERSONAL_DOCUMENTS_COLLECTION)
      .add(body);
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
    const snapshot = await docxonRef
      .where('receiverEmail', '==', userId)
      .orderBy('companyName')
      .get();
    if (snapshot.empty) {
      return 'No matching documents.';
    }
    if (!snapshot) {
      throw new Error('something went wrong try to get documents');
    }
    const documents = [];
    snapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    return documents;
  } catch (err) {
    return Error('something went wrong try agian');
  }
};

const getDocumentById = async (documentId) => {
  try {
    const docRef = await db
      .collection(process.env.DOCUMENTS_COLLECTION)
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
const deleteDocumentById = async (documentId) => {
  try {
    const res = await db
      .collection(process.env.DOCUMENTS_COLLECTION)
      .doc(documentId)
      .delete();
    if (!res) {
      throw new Error('something went wrong when trying to delete document');
    }
    return 'document deleted';
  } catch (err) {
    return Error('sorry update cancelled', err);
  }
};
const searchUserDocuments = async (userId, searchText) => {
  try {
    const documentsRef = db.collection(process.env.DOCUMENTS_COLLECTION);
    const userDoc = documentsRef.where('userId', '==', userId);
    const res = userDoc.where('documentType', 'array-contains-any', searchText);
    const results = await res.get();

    results.forEach((doc) => {
      console.log(doc.data());
    });
    const documents = [];
    // res.forEach((doc) => {
    //   documents.push(doc.data());
    // });
    res.status(200).json({ documents });
  } catch (err) {
    return Error('something went wrong');
  }
};

const shareDocumentRecieved = async (documentId, receiveremail) => {
  try {
    console.log('hello how are you');
    console.log(documentId);
    console.log(receiveremail);

    const docRef = await db
      .collection(process.env.DOCUMENTS_COLLECTION)
      .doc(documentId)
      .set(
        {
          shareWith: arrayUnion(receiveremail),
        },
        { merge: true }
      );
    console.log('dkskdskdskd');
    const doc = await docRef.get();
    if (!doc.exists) {
      return 'No Such document exits';
    }
    return doc.data();
  } catch (err) {
    return Error('something went wrong try agian');
  }
};
module.exports = {
  uploadFile,
  uploadProperties,
  uploadpersonalProperties,
  getDocumetnByUserId,
  getDocumentById,
  updateDocumentById,
  uploadFileFromBuffer,
  deleteDocumentById,
  searchUserDocuments,
  shareDocumentRecieved,
};
