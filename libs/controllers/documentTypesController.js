const documentTypesHelper = require('../../helpers/documentTypeHelper');

const getDocumentTypes = async (req, res, next) => {
  try {
    const documentTypes = await documentTypesHelper.getDocumentsTypes();
    if (!documentTypes) {
      throw new Error('something went wrong try again');
    }
    res.status(200).json(documentTypes);
  } catch (error) {
    next(error);
  }
};

const getDocumentTypeById = async (req, res, next) => {
  try {
    const { documentTypeId } = req.params;
    const document = await documentTypesHelper.getDocumentTypeById(
      documentTypeId
    );
    if (!document) {
      throw new Error('something went wrong try again');
    }
    res.status(200).json(document);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDocumentTypes,
  getDocumentTypeById,
};
