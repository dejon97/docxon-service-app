const { getFileById } = require('../../helpers/fileHelper');

const getFilesById = (req, res) => {
  getFileById();

  res.json({ status: 'Ok' });
};

module.exports = {
  getFilesById,
};
