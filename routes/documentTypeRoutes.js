const express = require('express');

const router = express.Router();

const documentTypesController = require('../libs/controllers/documentTypesController');

router.get('/', documentTypesController.getDocumentTypes);
router.get('/:documentTypeId', documentTypesController.getDocumentTypeById);
// update a document with document Id
router.put('/:documentTypeId', documentTypesController.updateDocumentTypeById);

router.delete(
  '/:documentTypeId',
  documentTypesController.deleteDocumentTypeById
);

module.exports = router;
