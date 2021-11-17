const express = require('express');

const router = express.Router();

const {
  getDocumentTypes,
  getDocumentTypesById,
} = require('../libs/controllers/documentTypesController');

router.get('/', getDocumentTypes);
router.get('/:id', getDocumentTypesById);

module.exports = router;
