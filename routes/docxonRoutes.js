const express = require('express');

const router = express.Router();

const {
  storeDocumentAndFile,
  storePersonalDocumentAndFile,
} = require('../libs/controllers/docxonController');

router.post('/', storeDocumentAndFile);
router.post('/personal', storePersonalDocumentAndFile);

module.exports = router;
