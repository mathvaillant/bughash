const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv').config();
const colors = require('colors')

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/bugs', require('./routes/bugsRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/uploads', require('./routes/uploadRoutes'));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(errorHandler); // Error middleware is meant to prevent sending 400 raw html pages on errors

app.listen(port, () => console.log(`Server started on PORT:${port}`));