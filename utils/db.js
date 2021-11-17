require('dotenv').config();

const Firestore = require('@google-cloud/firestore');

const getDBConnection = async () => {
  const credentials = JSON.parse(process.env.DB_CONNECTION);
  const dbConnection = new Firestore({
    projectId: credentials.project_id,
    credentials,
  });

  return dbConnection;
};

module.exports = {
  getDBConnection,
};
