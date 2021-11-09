const express = require('express');

const router = express.Router();

const documentsController = require('../libs/controllers/documentsController');

router.get('/', (req, res) => {
  res.send('documents');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(`documents ${id}`);
});

router.post('/', (req, res) => {
  documentsController.postDocuments(req.body);
  res.send('documents');
});


module.exports = router;
