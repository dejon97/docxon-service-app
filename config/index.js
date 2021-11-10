const Cloud = require('@google-cloud/storage');
const path = require('path');
const dotenv = require('dotenv');

const serviceKey = path.join(__dirname, './key.json');
dotenv.config();
const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.Project_Id,
});

module.exports = storage;
