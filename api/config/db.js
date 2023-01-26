const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require('dotenv').config()

// Replace this with your MONGOURI.
const MONGOURI = process.env.MONGO_URI;
const InitiateMongoServer = async () => {
    try {
        // attempts a connection to the database
        await mongoose.connect(MONGOURI, {
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