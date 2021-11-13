const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const documentHelper = require('../../helpers/documentHelper');

// https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/
const getDocuments = () => {
  const documents = [];

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
const postDocuments = async (req, res, next) => {
  // use Ajv JSON schema validator to validate the payload https://www.npmjs.com/package/ajv
  // base 64 decode document
  // persist document to Google Cloud Storage
  // persit properties to Google Cloud Firestore
  try {
    const myFile = req.file;
    const properties = req.body;
    const fileUrl = await documentHelper.uploadFile(myFile);
    if (!fileUrl) {
      throw new Error('Sorry unable to upload try again ');
    }
    const attributes = await documentHelper.uploadProperties(fileUrl);
    if (!attributes) {
      throw new Error('sorry unable to upload properties');
    }
    const newDoc = {
      docId: attributes,
      message: 'document succesfully added ',
    };

    res.status(201).json(newDoc);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDocuments,
  getDocumentsById,
  postDocuments,
};
