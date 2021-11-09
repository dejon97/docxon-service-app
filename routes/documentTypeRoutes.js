const express = require('express');

const router = express.Router();

const documentTypesController = require('../libs/controllers/documentTypesController');

router.get('/', (req, res) => {
  documentTypesController.getDocumentTypes();
  res.send('documentTypes');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  documentTypesController.getDocumentTypesById(id);
  res.send(`documentTypes ${id}`);
});

module.exports = router;
