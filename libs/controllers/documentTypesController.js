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

const updateDocumentTypeById = async (req, res, next) => {
  try {
    const { docId } = req.params;
    const doc = req.body;
    const results = await documentTypesHelper.updateDocumentTypeById(
      docId,
      doc
    );
    if (!results) {
      throw new Error('sorry unable to update properties');
    }
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};
const deleteDocumentTypeById = async (req, res, next) => {
  try {
    const { documentTypeId } = req.params;

    const document = await documentTypesHelper.deleteDocumentTypeById(
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
  updateDocumentTypeById,
  deleteDocumentTypeById,
};
