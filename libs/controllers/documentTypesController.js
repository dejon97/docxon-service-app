const getDocumentTypes = async (req, res, next) => {
  const documents = [];

  res.send(`documentTypes`);
};

const getDocumentTypesById = async (req, res, next) => {
  const { id } = req.params;

  const documents = [];

  res.send(`documentTypes ${id}`);
};

module.exports = {
  getDocumentTypes,
  getDocumentTypesById,
};
