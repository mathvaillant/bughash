const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/bugs', require('./routes/bugsRoutes'));
app.use('/users', require('./routes/userRoutes'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errorHandler);

module.exports = app;