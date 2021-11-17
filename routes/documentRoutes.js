const express = require('express');
const Multer = require('multer');
const { Validator } = require('express-json-validator-middleware');
const validateRequestWare = require('../middlewares/validate_request_middleware');
const documentSchema = require('../validators/documentValidatorschema.json');
const {
  getDocumentById,
  getDocumentsByUserId,
  postDocuments,
} = require('../libs/controllers/documentsController');
// const { file } = require('@babel/types');

const router = express.Router();
const { validate } = new Validator();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

// get a document with document Id
router.get('/:docId', getDocumentById);

// get all document for a particular user using userId
router.get('/docs/:userId', getDocumentsByUserId);

// posting a document to a user
router.post(
  '/',
  multer.single('file'),
  validate({ body: documentSchema }),
  validateRequestWare,
  postDocuments
);

module.exports = router;
