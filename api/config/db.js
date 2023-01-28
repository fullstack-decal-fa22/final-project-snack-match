const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config()

// Connect using the MongoClient.connect static method
const MongoClient = require('mongodb').MongoClient;
const test = require('assert');
// Connection url
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'test';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
  const db = client.db(dbName);
  client.close();
});

// Replace this with your MONGOURI.
const MONGOURI = process.env.MONGODB_URI;
const InitiateMongoServer = async () => {
    try {
        // attempts a connection to the database
        await mongoose.connect(MONGOURI, {
            dbName: 'gameData',
            useNewUrlParser: true,
        });
        // console message indicates that a proper connection has been made
        console.log("Connected to DB !!");
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = InitiateMongoServer;