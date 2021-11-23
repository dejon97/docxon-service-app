const dotenv = require('dotenv');
const db = require('../utils/connect');

dotenv.config();

const getDocumentsTypes = async () => {
  try {
    const documents = [];
    const snapshot = await db
      .collection(process.env.DocumentTypeCollection)
      .get();
    if (snapshot.empty) {
      return 'no document found ';
    }

    snapshot.forEach((doc) => {
      documents.push(doc.id);
    });
    return documents;
  } catch (err) {
    return Error('something went wrong');
  }
};

const getDocumentTypeById = async (documentTypeId) => {
  try {
    const docRef = await db
      .collection(process.env.DocumentTypeCollection)
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
module.exports = { getDocumentsTypes, getDocumentTypeById };
