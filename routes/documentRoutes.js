// const { file } = require('@babel/types');
const express = require('express');
const Multer = require('multer');

const router = express.Router();
const documentsController = require('../libs/controllers/documentsController');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});
router.get('/', (req, res) => {
  res.send('documents');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`documents ${id}`);
});

router.post('/', multer.single('file'), (req, res, next) => {
  documentsController.postDocuments(req, res, next);
});

module.exports = router;
