require('dotenv').config();
const Firestore = require('@google-cloud/firestore');

// https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/
const getDocuments = () => {
  const documents = [];

  const credentials = JSON.parse(process.env.DB_CONNECTION);
  const dbConnection = new Firestore({
    projectId: credentials.project_id,
    credentials,
  });

  const ref = dbConnection.collection('docxondb');

  ref
    .doc('5e94a206-ddf3-4f36-9dbc-1b75862e4113')
    .get()
    .then((docRef) => {
      console.log(docRef.data());
    });

  return documents;
};

const getDocumentsById = (id) => {
  const documents = [];

  return documents;
};

/**
 * Handles new docxon payloads.
 *
 * The is the primary end point for ingesting docxon payloads.
 *
 */
const postDocuments = (docxonPayload) => {
  // use Ajv JSON schema validator to validate the payload https://www.npmjs.com/package/ajv
  // base 64 decode document
  // persist document to Google Cloud Storage
  // persit properties to Google Cloud Firestore

  const response = {
    code: 0,
    message: 'document saved successfully',
  };

  return response;
};

module.exports = {
  getDocuments,
  getDocumentsById,
  postDocuments,
};
