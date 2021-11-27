const express = require('express');

const router = express.Router();

const {
  storeDocumentAndFile,
} = require('../libs/controllers/docxonController');

router.post('/', storeDocumentAndFile);

module.exports = router;
