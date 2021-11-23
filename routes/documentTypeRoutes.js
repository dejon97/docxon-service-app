const express = require('express');

const router = express.Router();

const documentTypesController = require('../libs/controllers/documentTypesController');

router.get('/', documentTypesController.getDocumentTypes);
router.get('/:documentTypeId', documentTypesController.getDocumentTypeById);
module.exports = router;
