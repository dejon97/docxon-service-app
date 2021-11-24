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

module.exports = {
  getDocumentsTypes,
  getDocumentTypeById,
};
