const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan('dev'));
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 5000;

if (!module.parent) {
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
}

module.exports = app;
