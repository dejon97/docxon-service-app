const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const documentRoutes = require('./routes/documentRoutes');
const documentTypeRoutes = require('./routes/documentTypeRoutes');
const fileRoutes = require('./routes/fileRoutes');
const docxonRoutes = require('./routes/docxonRoutes');
const algoliaHelper = require('./helpers/algoria-search');

const app = express();

const maxRequestBodySize = '50mb';
app.use(express.json({ limit: maxRequestBodySize }));
app.use(express.urlencoded({ limit: maxRequestBodySize }));
app.use(helmet());
app.use(cors());
// app.use(algoliaHelper());

// Routes
app.use('/', (req, res, next) => {
  console.log(
    `Request ${req.method} :: ${req.headers.host} :: ${req.originalUrl}`
  );
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'up' });
});

app.use('/service/documents', documentRoutes);
app.use('/service/documentTypes', documentTypeRoutes);
app.use('/service/files', fileRoutes);
app.use('/service/docxon', docxonRoutes);

module.exports = app;
