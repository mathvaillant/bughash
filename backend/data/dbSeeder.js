const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bug = require('../models/bugModel');

dotenv.config({ path: '.env' });

const sampleBugs = JSON.parse(fs.readFileSync(`${__dirname}/bugs.json`, 'utf8'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB successfully connected'.green)
    });

// Import data to MongoDB
const importData = async () => {
    try {
        await Bug.create(sampleBugs);
        console.log('Successfully imported data to MongoDB'.bgGreen);
        process.exit(0);
    } catch (error) {
        console.log('Error importing data to MongoDB'.bgRed, error);
        process.exit(1);
    }
}

// Delete data from MongoDB
const deleteData = async () => {
    try {
        await Bug.deleteMany();
        console.log('Data successfully deleted from MongoDB'.black.bgYellow);
        process.exit(0);
    } catch (error) {
        console.log('Error deleting data from MongoDB'.bgRed, error);
        process.exit(1);
    }
}

if(process.argv[2] === '--importData') {
    importData();
} else if (process.argv[2] === '--deleteData') {
    deleteData();
}