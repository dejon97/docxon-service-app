require('dotenv').config();

const { Storage } = require('@google-cloud/storage');
const logger = require('../../utils/logger');

const credentials = JSON.parse(process.env.STORAGE_CONNECTION);

const getStorage = () => {
  const storage = new Storage({
    projectId: credentials.project_id,
    credentials,
  });

  logger.info('SUCCESS: Storage Connection');

  return storage;
};

module.exports = {
  getStorage,
};
