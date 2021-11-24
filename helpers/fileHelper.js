require('dotenv').config();

const bucket = require('../libs/data/storage').getBucket();

const getFileById = async () => {
  const options = {
    destination: 'newBird.jpg',
  };

  // https://cloud.google.com/storage/docs/samples/storage-stream-file-download
  // Download public file.
  // await bucket.file('newBird.jpg').download(options);
};

module.exports = {
  getFileById,
};
