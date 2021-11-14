const express = require('express');
const Multer = require('multer');
const { Validator } = require('express-json-validator-middleware');
const validateRequestWare = require('../middlewares/validate_request_middleware');
const documentSchema = require('../validators/documentValidatorschema.json');
const documentsController = require('../libs/controllers/documentsController');

const router = express.Router();
const { validate } = new Validator();
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

router.post(
  '/',
  validate({ body: documentSchema }),
  validateRequestWare,
  (req, res, next) => {
    documentsController.postDocuments(req, res, next);
  }
);

module.exports = router;
