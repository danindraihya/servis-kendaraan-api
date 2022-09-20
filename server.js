const express = require('express');
require('dotenv').config();
const servisController = require('./controller/servis-controller');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', servisController);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));