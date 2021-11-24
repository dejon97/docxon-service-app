const express = require('express');

const router = express.Router();

const { getFilesById } = require('../libs/controllers/filesController');

router.get('/:id', getFilesById);

module.exports = router;
