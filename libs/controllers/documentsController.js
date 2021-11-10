const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const uploadFile = require('../../helpers/documentHelper');

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
    const fileUrl = await uploadFile(myFile);
    if (!fileUrl) {
      throw new Error('Sorry unable to upload try again ');
    }
    res.status(201).json({ message: 'Upload was successful', data: fileUrl });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDocuments,
  getDocumentsById,
  postDocuments,
};
