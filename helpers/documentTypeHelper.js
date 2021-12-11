require('dotenv').config();
const db = require('../libs/data/db').getDB();

const getDocumentsTypes = async () => {
  try {
    const documents = [];
    const snapshot = await db
      .collection(process.env.DOCUMENT_TYPE_COLLECTION)
      .get();
    if (snapshot.empty) {
      return 'no document found ';
    }

    snapshot.forEach((doc) => {
      documents.push(doc.data());
    });
    return documents;
  } catch (err) {
    return Error('something went wrong');
  }
};

const getDocumentTypeById = async (documentTypeId) => {
  try {
    const docRef = await db
      .collection(process.env.DOCUMENT_TYPE_COLLECTION)
      .doc(documentTypeId);

    const doc = await docRef.get();

    if (!doc.exists) {
      return 'No Such documentType exits';
    }
    return doc.data();
  } catch (err) {
    return Error('something went wront try agian');
  }
};

const updateDocumentTypeById = async (documentTypeId, doc) => {
  try {
    const docRef = await db
      .collection(process.env.DOCUMENT_TYPE_COLLECTION)
      .doc(documentTypeId);
    const res = await docRef.set(doc, { merge: true });
    if (!res) {
      throw new Error(
        'something went wrong when trying to update documentType'
      );
    }
    return 'documentType update';
  } catch (err) {
    return Error('sorry update cancelled', err);
  }
};

const deleteDocumentTypeById = async (documentTypeId) => {
  try {
    const docRef = await db
      .collection(process.env.DOCUMENT_TYPE_COLLECTION)
      .doc(documentTypeId)
      .delete();

    if (!docRef) {
      return 'Sorry something went wrong';
    }
    return `documenttype of ${documentTypeId} deleted`;
  } catch (err) {
    return Error('something went wront try agian');
  }
};

module.exports = {
  getDocumentsTypes,
  getDocumentTypeById,
  updateDocumentTypeById,
  deleteDocumentTypeById,
};
