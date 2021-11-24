const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const documentRoutes = require('./routes/documentRoutes');
const documentTypeRoutes = require('./routes/documentTypeRoutes');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());

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

module.exports = app;
