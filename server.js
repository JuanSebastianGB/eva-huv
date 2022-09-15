// import express from 'express';
// import router from './routes';

const express = require('express');

const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
