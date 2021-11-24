const documentHelper = require('../../helpers/documentHelper');

// https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/
// const getDocuments = () => {
//   const documents = [];
//   return documents;
// };

const getDocumentsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const documents = await documentHelper.getDocumetnByUserId(userId);
    if (!documents) {
      throw new Error('something went wrong try again');
    }
    res.status(200).json(documents);
  } catch (error) {
    next(error);
  }
};

const getDocumentById = async (req, res, next) => {
  try {
    const { docId } = req.params;
    const document = await documentHelper.getDocumentById(docId);
    if (!document) {
      throw new Error('something went wrong try again');
    }
    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

/**
 * Handles new docxon payloads.
 *
 * The is the primary end point for ingesting docxon payloads.
 *
 */
const postDocuments = async (req, res, next) => {
  // use Ajv JSON schema validator to validate the payload https://www.npmjs.com/package/ajv
  // base 64 decode document
  // persist document to Google Cloud Storage
  // persit properties to Google Cloud Firestore
  try {
    const myFile = req.file;
    const newDoc = JSON.parse(JSON.stringify(req.body));
    if (!myFile) {
      const attributes = await documentHelper.uploadProperties(newDoc);
      if (!attributes) {
        throw new Error('sorry unable to upload properties');
      }
      const createdDoc = {
        docId: attributes,
        message: 'document succesfully added ',
      };
      res.status(201).json(createdDoc);
    } else {
      const fileUrl = await documentHelper.uploadFile(myFile);
      if (!fileUrl) {
        throw new Error('Sorry unable to upload try again ');
      }

      newDoc.path = fileUrl;
      const attributes = await documentHelper.uploadProperties(newDoc);
      if (!attributes) {
        throw new Error('sorry unable to upload properties');
      }
      const createdDoc = {
        docId: attributes,
        message: 'document succesfully added ',
      };
      res.status(201).json(createdDoc);
    }
  } catch (error) {
    next(error);
  }
};

const updateDocumentById = async (req, res, next) => {
  try {
    const { docId } = req.params;
    const doc = req.body;
    const results = await documentHelper.updateDocumentById(docId, doc);
    if (!results) {
      throw new Error('sorry unable to upload properties');
    }
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDocumentById,
  getDocumentsByUserId,
  postDocuments,
  updateDocumentById,
};
