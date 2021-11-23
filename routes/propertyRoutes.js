const express = require('express');

const router = express.Router();

const propertiesController = require('../libs/controllers/propertiesController');

router.get('/:id', (req, res) => {
  const { id } = req.params;

  propertiesController.getPropertiesById(id);

  res.send(`properties ${id}`);
});

router.post('/', (req, res) => {
  res.send('properties');
});

module.exports = router;
