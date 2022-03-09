const express = require('express');
const Multer = require('multer');
const { Validator } = require('express-json-validator-middleware');
const validateRequestWare = require('../middlewares/validate_request_middleware');
const documentSchema = require('../validators/documentValidatorschema.json');
const documentsController = require('../libs/controllers/documentsController');
// const { file } = require('@babel/types');

const router = express.Router();
const { validate } = new Validator();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

router.post(
  '/',
  multer.single('file'),
  validate({ body: documentSchema }),
  validateRequestWare,
  documentsController.postDocuments
);

// get a document with document Id
router.get('/:docId', documentsController.getDocumentById);

// get all document for a particular user using userId
router.get('/docs/:userId', documentsController.getDocumentsByUserId);

// posting a document to a user

// update a document with document Id
router.put('/:docId', documentsController.updateDocumentById);

// delete a document with document Id
router.delete('/:docId', documentsController.deleteDocumentById);

module.exports = router;
