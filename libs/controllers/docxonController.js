const {
  uploadProperties,
  uploadFileFromBuffer,
} = require('../../helpers/documentHelper');

const storeDocumentAndFile = async (req, res) => {
  const {
    account: { id },
    document,
    properties,
  } = req.body;

  const {
    type: { name },
    type: { namespace },
    fields,
  } = properties;

//   const docProperties = fields.reduce((obj, item) => {
//     obj[item.name] = item.value;
//     return obj;
//   }, {});
  const docProperties =  fields;
  docProperties.userId = id;
  docProperties.documentType = `${namespace}:${name}`;
  docProperties.mime = document.mime;
  docProperties.filename = document.filename;
  docProperties.createdTime = `${new Date().getTime()}`;

  const fileBuffer = Buffer.from(document.file, 'base64');

  const filename = `${docProperties.createdTime}_${document.filename}`;
  const fileURL = await uploadFileFromBuffer(fileBuffer, filename);
  console.log(fileURL);

  docProperties.documentURL = fileURL;

  console.log(docProperties);

  uploadProperties(docProperties);

  res.json({ status: 'Ok' });
};

module.exports = {
  storeDocumentAndFile,
};
