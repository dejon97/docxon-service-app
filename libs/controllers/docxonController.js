const moment = require('moment');
const {
  uploadProperties,
  uploadFileFromBuffer,
  uploadpersonalProperties,
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

  const docProperties = fields.reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});
  docProperties.userId = id;
  docProperties.documentType = `${namespace}:${name}`;
  docProperties.mime = document.mime;
  docProperties.filename = document.filename;
  docProperties.createdTime = moment().format('DD-MM-YYYY');
    docProperties.timestamp =  Date.now()
  docProperties.isLater = false;
  docProperties.isViewed = false;
  const me = '';
  const fileBuffer = Buffer.from(
    document.file.replace(/^data:.+;base64,/, ''),
    'base64'
  );

  const filename = `${docProperties.createdTime}_${document.filename}`;
  const fileURL = await uploadFileFromBuffer(fileBuffer, filename);
  // console.log(document.file)
  console.log(fileURL);

  docProperties.documentURL = fileURL;

  uploadProperties(docProperties);

  res.json({ status: 'Ok' });
};
const storePersonalDocumentAndFile = async (req, res) => {
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

  const docProperties = fields.reduce((obj, item) => {
    obj[item.name] = item.value;
    return obj;
  }, {});
  docProperties.userId = id;
  docProperties.documentType = `${namespace}:${name}`;
  docProperties.mime = document.mime;
  docProperties.filename = document.filename;
  docProperties.createdTime = moment().format('DD-MM-YYYY');
    docProperties.timestamp =  Date.now();
  const fileBuffer = Buffer.from(
    document.file.replace(/^data:.+;base64,/, ''),
    'base64'
  );

  const filename = `${docProperties.createdTime}_${document.filename}`;
  const fileURL = await uploadFileFromBuffer(fileBuffer, filename);
  docProperties.documentURL = fileURL;

  uploadpersonalProperties(docProperties);
  console.log('sent succesfully');
  res.json({ status: 'Ok' });
};

module.exports = {
  storeDocumentAndFile,
  storePersonalDocumentAndFile,
};
